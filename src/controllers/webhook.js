const crypto = require('crypto');
const Util = require('../utils/utils');
const config = require('../config');
const PaymentFactory = require('../utils/payments');
const Order = require('../models').Order;


const util = new Util();


module.exports = class WebhookController {

    static async monnify_payment(req, res) {
        
        const paymentRef = req.body.paymentReference;
        const amount = req.body.amountPaid;
        const dateTime = req.body.paidOn;
        const transactionRef = req.body.transactionReference;
        
        const webhookParams = `${config.monnify.apiSecret}|${paymentRef}|${amount}|${dateTime}|${transactionRef}`;
        const transactionHash = crypto.createHash('sha512').update(webhookParams).digest('hex');
        
        
        if (transactionHash === req.body.transactionHash) {
            // get payment gateway class from factory
            const paymentGateway = PaymentFactory.createPaymentGateway();

            // get transaction details
            paymentGateway.getTransaction({paymentRef}).then(
                (transaction) => {
                    if (transaction.requestSuccessful && 
                        transaction.responseBody.paymentStatus.toUpperCase() === 'PAID') {
                        
                            // get the order with the paymentRef
                            Order.findOne(
                                {
                                    where: { order_id: paymentRef.toUpperCase() }
                                }
                                ).then(
                                (order) => {
                                    if (transaction.responseBody.amount >= order.amount) {
                                        // flag order as paid
                                        Order.update(
                                            {paid: true},
                                            {where: { order_id: order.order_id }}
                                        )
                                    }
                                }
                            )
                    }
                }
            );
        }


        const msg = 'Received';
        util.setSuccess(200, msg, {});

        return util.send(res);
    }

}
