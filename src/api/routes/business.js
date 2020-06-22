const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const businessController = require('../../controllers/business');
const middlewares = require('../middlewares');

const router = express.Router();

module.exports = app => {
    app.use('/businesses', router);

    router.put(
        '/:id',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                name: celebrate.Joi.string().required(),
                address: celebrate.Joi.string().required(),
                phone: celebrate.Joi.string().required(),
                logo: celebrate.Joi.string().required(),
                description: celebrate.Joi.string().required(),
            }),
        }),
        eah(businessController.update)
    );

    router.get('/:id', eah(businessController.get));

    router.get('', eah(businessController.fetch));



};
