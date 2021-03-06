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
                grade: celebrate.Joi.string().valid('grade1', 'grade2', 'grade3', 'export').required()
            }),
        }),
        eah(cartController.create)
    );

    router.put(
        '/:id',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                quantity: celebrate.Joi.number().min(1).required(),
            }),
        }),
        eah(cartController.update)
    );

    router.get(
        '',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        eah(cartController.fetch)
    );

    router.delete(
        '/:id?',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        eah(cartController.remove)
    );

};
