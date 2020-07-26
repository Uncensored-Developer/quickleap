const axios = require('axios');
const fetch = require('node-fetch');
const typedi = require('typedi');
const AbstractBasePayment = require('./base');
const config = require('../../config');


module.exports = class MonnifyPayment extends AbstractBasePayment {

    constructor() {
        super();
        this._authDetails = `${config.monnify.apiKey}:${config.monnify.apiSecret}`;
        this._headers = {
            Authorization: `Basic ${Buffer.from(this._authDetails).toString('base64')}`,
            'Content-Type': 'application/json'
        };
        this._baseUrl = (config.live === 'true') ? '' : 'https://sandbox.monnify.com';
        this.logger = typedi.Container.get('logger');
    }

    async getUrl(obj) {
        const data = {
            amount: obj.amount,
            customerName: obj.name,
            customerEmail: obj.email,
            paymentReference: obj.orderId,
            paymentDescription: `Payment for order ${obj.orderId}`,
            currencyCode: 'NGN',
            contractCode: config.monnify.contractCode,
            paymentMethod: ["CARD", "ACCOUNT_TRANSFER"],
            redirectUrl: config.payments.redirectUrl
        }
        const url = `${this._baseUrl}/api/v1/merchant/transactions/init-transaction`

        try {
            const response = await fetch(url, { 
                method: 'POST', 
                body: JSON.stringify(data),
                headers: this._headers
            });
            const json = await response.json();
            if (json.requestSuccessful) return { url: json.responseBody.checkoutUrl }
            return { url: null }
        } catch (e) {
            this.logger.error(e.response);
            throw e;
        }
    }

    async getTransaction(obj) {
        // paymentRef is the order id
        const url = `${this._baseUrl}/api/v1/merchant/transactions/query?paymentReference=${obj.paymentRef}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: this._headers
            });
            return await response.json();
        } catch (e) {
            this.logger.error(e.response);
            throw e;
        }
    }

}
