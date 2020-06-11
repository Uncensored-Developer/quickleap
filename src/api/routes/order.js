const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const orderController = require('../../controllers/order');
const middlewares = require('../middlewares');

const router = express.Router();


module.exports = app => {
    app.use('/orders', router);

    router.post(
        '',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                address: celebrate.Joi.string().required(),
            }),
        }),
        orderController.create
    )

    



};
