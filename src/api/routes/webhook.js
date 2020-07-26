const express = require('express');
const eah = require('express-async-handler');
const webhookController = require('../../controllers/webhook');


const router = express.Router();

module.exports = app => {
    app.use('/webhook', router);

    router.post(
        '/monnify',
        eah(webhookController.monnify_payment)
    );

};
