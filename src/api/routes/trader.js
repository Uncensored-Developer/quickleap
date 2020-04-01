const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const traderController = require('../../controllers/trader');
const middlewares = require('../middlewares');

const router = express.Router();

module.exports = app => {
    app.use('/traders', router);

    router.put(
        '/:id',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                classification: celebrate.Joi.string().valid('grain', 'livestock', 'fresh').required(),
                focus_area: celebrate.Joi.number().required(),
                price_details: celebrate.Joi.string().required(),
                quality: celebrate.Joi.string().valid('grade1', 'grade2').required(),
            }),
        }),
        eah(traderController.update)
    );

    router.get('/:id', eah(traderController.get));

    router.get('', eah(traderController.fetch));



};
