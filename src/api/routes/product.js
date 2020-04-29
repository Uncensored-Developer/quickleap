const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const productController = require('../../controllers/product');
const middlewares = require('../middlewares');

const router = express.Router();

module.exports = app => {
    app.use('/products', router);

    router.post(
        '',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        middlewares.isAggregatorOrAdmin,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                classification: celebrate.Joi.string().valid('raw', 'processed').required(),
                name: celebrate.Joi.string().required(),
                description: celebrate.Joi.string().required(),
                image: celebrate.Joi.string().required(),
            }),
        }),
        productController.create
    )

    // router.put(
    //     '/:id',
    //     middlewares.isAuth,
    //     middlewares.attachCurrentUser,
    //     celebrate.celebrate({
    //         body: celebrate.Joi.object({
    //             classification: celebrate.Joi.string().valid('grain', 'tuber', 'fiber', 'legume').required(),
    //             focus_area: celebrate.Joi.number().required(),
    //             yield_per_hectare: celebrate.Joi.number().required(),
    //             quality_control: celebrate.Joi.string().valid('grade1', 'grade2').required(),
    //         }),
    //     }),
    //     eah(farmerController.update)
    // );

    // router.get('/:id', eah(farmerController.get));

    // router.get('', eah(farmerController.fetch));



};
