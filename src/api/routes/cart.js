const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const cartController = require('../../controllers/cart');
const middlewares = require('../middlewares');

const router = express.Router();

const celebrateValidation = celebrate.celebrate({
    body: celebrate.Joi.object({
        productUUID: celebrate.Joi.string().required(),
        quantity: celebrate.Joi.number().min(1).required(),
    }),
});

module.exports = app => {
    app.use('/cart', router);

    router.post(
        '',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrateValidation,
        cartController.create
    )

    // router.put(
    //     '/:uuid',
    //     middlewares.isAuth,
    //     middlewares.attachCurrentUser,
    //     middlewares.isAggregatorOrAdmin,
    //     celebrateValidation,
    //     eah(productController.update)
    // );

    // router.get('/:uuid', productController.get);

    // router.get('', productController.fetch);



};
