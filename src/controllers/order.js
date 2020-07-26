const uid = require('rand-token').uid;
const Order = require('../models').Order;
const OrderItem = require('../models').OrderItem;
const Cart = require('../models').Cart;
const Util = require('../utils/utils');
const helpers = require('../utils/helpers');
const PaymentFactory = require('../utils/payments');
const getMaxMarkedUpProductPrice = require('../utils/helpers').getMaxMarkedUpProductPrice;


const util = new Util();


module.exports = class OrderController {

    static async create (req, res) {
        // get payment gateway class from factory
        const paymentGateway = PaymentFactory.createPaymentGateway();

        // fetch all items in cart to calculate total amount
        const items = await Cart.findAll({ where: { UserId: req.user.id } });
        const total = async () => {
            let prices = [];
            let orderItems = [];
            for (let item of items) {
                const price = await getMaxMarkedUpProductPrice(item.ProductId, item.grade);
                prices.push(price * item.quantity);
                orderItems.push({
                    price,
                    ProductId: item.ProductId,
                    quantity: item.quantity,
                    real_price: item.price
                });
            }

            return {
                orderItems,
                amount: prices.reduce((a, b) => a + b, 0)
            }
        }

        const calcTotal = await total();

        const order_data = {
            address: req.body.address,
            order_id: `QL${uid(8).toUpperCase()}`,
            UserId: req.user.id,
            amount: calcTotal.amount
        }

        // save order
        const order = await Order.create(order_data);

        // save items to OrderItem
        const orderItems = calcTotal.orderItems;
        for (let item of orderItems) {
            item.OrderId = order.id
        }
        OrderItem.bulkCreate(orderItems);

        // make call to payment gateway to get checkout url
        const paymentData = {
            orderId: order.order_id,
            name: req.user.name,
            amount: order.amount,
            email: (req.user.username.includes('@')) ? req.user.username : 'default@quickleap.com'
        }
        const response = await paymentGateway.getUrl(paymentData);

        const data = {
            order_id: order.order_id,
            status: order.status,
            amount: order.amount,
            paymentUrl: response.url
        }

        // clear all user cart
        if (response.url) Cart.destroy({ where: { UserId: res.user.id } })

        const msg = 'Order Created';
        util.setSuccess(201, msg, data);

        return util.send(res);
    }

    static async fetch(req, res) {

        const {offset, limit} = helpers.getParams(req);

        const params = {
            offset,
            limit,
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: {
                exclude: ['id',]
            }
        }

        let orders = null

        if (req.user.account_type !== 'admin') {
            params.where = { UserId: req.user.id };
        }

        orders = await Order.findAll(params);

        const msg = 'Orders Found';
        util.setSuccess(200, msg, orders);

        return util.send(res);

    }

    static async get(req, res) {

        const {orderId} = req.params;

        const order = await Order.findOne({ where: { order_id: orderId } });

        let msg = 'Order Found.';

        if (order) {
            const data = {
                region: order.region,
                address: order.address,
                paid: order.paid,
                status: order.status,
                order_id: order.order_id,
                UserId: order.UserId,
                createdAt: order.createdAt,
                items: []
            }
            util.setSuccess(200, msg, data);
            if (req.user.account_type !== 'admin' && order.UserId !== req.user.id) {
                msg = 'You are not authorized to view this order.';
                util.setError(403, msg);
            }
        } else {
            msg = 'Order not found.';
            util.setError(404, msg);
        }

        return util.send(res);


    }

    static async update(req, res) {

        const { orderId } = req.params;

        const order = await Order.findOne({ where: { order_id: orderId } });

        let msg = 'Order Found.';

        if (order) {
            const data = {
                status: req.body.status
            };
            Order.update(
                data,
                {where: {order_id: orderId}}
            );
            msg = 'Order status updated';
            util.setSuccess(200, msg, data);
        } else {
            msg = 'Order not found.';
            util.setError(404, msg);
        }

        return util.send(res);


    }

}
