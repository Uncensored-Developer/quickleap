const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const cartController = require('../../controllers/cart');
const middlewares = require('../middlewares');

const router = express.Router();


module.exports = app => {
    app.use('/cart', router);

    router.post(
        '',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                productUUID: celebrate.Joi.string().required(),
                quantity: celebrate.Joi.number().min(1).required(),
            }),
        }),
        eah(cartController.create)
    )

    router.put(
        '/:id',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                quantity: celebrate.Joi.number().min(1).required(),
            }),
        }),
        cartController.update
    );

    // router.get('/:uuid', productController.get);

    // router.get('', productController.fetch);



};
