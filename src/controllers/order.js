const uid = require('rand-token').uid;
const Order = require('../models').Order;
const Util = require('../utils/utils');


const util = new Util();


module.exports = class OrderController {

    static async create (req, res) {
        const order_data = {
            address: req.body.address,
            order_id: uid(10).toLowerCase()
        }

        // save order
        const order = await Order.create(order_data);

        const data = {
            order_id: order.order_id,
            status: order.status,
        }

        const msg = 'Order Created';
        util.setSuccess(201, msg, data);

        return util.send(res);
    }

}
