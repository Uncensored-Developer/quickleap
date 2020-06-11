const uid = require('rand-token').uid;
const Order = require('../models').Order;
const Util = require('../utils/utils');
const PaymentFactory = require('../utils/payments');


const util = new Util();


module.exports = class OrderController {

    static async create (req, res) {
        const order_data = {
            address: req.body.address,
            order_id: `GL${uid(8).toUpperCase()}`
        }

        // save order
        const order = await Order.create(order_data);

        // get payment gateway class from factory
        const factory = new PaymentFactory()
        const paymentGateway = factory.createPaymentGateway();

        // make call to payment gateway to get checkout url
        const paymentData = {
            orderId: order.order_id,
            name: req.user.name,
            amount: 600,
            email: (req.user.username.includes('@')) ? req.user.username : 'default@quickleap.com'
        }
        const response = await paymentGateway.getUrl(paymentData);

        const data = {
            order_id: order.order_id,
            status: order.status,
            paymentUrl: response.url
        }

        const msg = 'Order Created';
        util.setSuccess(201, msg, data);

        return util.send(res);
    }

}
