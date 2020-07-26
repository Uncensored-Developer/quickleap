const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const productController = require('../../controllers/product');
const middlewares = require('../middlewares');

const router = express.Router();

const celebrateValidation = celebrate.celebrate({
    body: celebrate.Joi.object({
        classification: celebrate.Joi.string().valid('raw', 'processed').required(),
        name: celebrate.Joi.string().required(),
        description: celebrate.Joi.string().required(),
        image: celebrate.Joi.string().required(),
        otherImages: celebrate.Joi.array().max(3),
    }),
});

module.exports = app => {
    app.use('/products', router);

    router.post(
        '',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        middlewares.isAggregatorOrAdmin,
        celebrateValidation,
        productController.create
    )

    router.put(
        '/:uuid',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        middlewares.isAggregatorOrAdmin,
        celebrateValidation,
        eah(productController.update)
    );

    router.get('/:uuid', eah(productController.get));

    router.get('', eah(productController.fetch));



};
