const MonnifyPayment = require('./monnify');
const config = require('../../config');


module.exports = class PaymentFactory {

    constructor() {
        this._paymentGatewayClass = null;
    }

    createPaymentGateway() {
        switch (config.payments.gateway) {
            case 'monnify':
                return new MonnifyPayment()        
            case 'gladepay':
                return null
        }
    }

}