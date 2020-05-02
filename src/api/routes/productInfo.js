const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const productInfoController = require('../../controllers/productInfo');
const middlewares = require('../middlewares');

const router = express.Router();

const celebrateValidation = celebrate.celebrate({
    body: celebrate.Joi.object({
        productUUID: celebrate.Joi.string().required(),
        grade: celebrate.Joi.string().valid('grade1', 'grade2', 'grade3', 'export').required(),
        price: celebrate.Joi.number().required(),
        location: celebrate.Joi.string().required(),
        quantity: celebrate.Joi.number().required(),
    }),
});

module.exports = app => {
    app.use('/productInfo', router);

    router.post(
        '',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        middlewares.isTraderOrAggregatorOrAdmin,
        celebrateValidation,
        productInfoController.create
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
