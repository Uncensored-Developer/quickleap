const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const warehouseController = require('../../controllers/warehouse');
const middlewares = require('../middlewares');


const router = express.Router();

module.exports = app => {
    app.use('/warehouses', router);

    router.put(
        '/:id',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                size: celebrate.Joi.string().required(),
                focus_area: celebrate.Joi.number().required(),
                price_details: celebrate.Joi.string().required(),
                location: celebrate.Joi.string().required(),
                images: celebrate.Joi.array().max(3)
            }),
        }),
        warehouseController.update
    );

    router.get('/:id', eah(warehouseController.get));

    router.get('', eah(warehouseController.fetch));



};
