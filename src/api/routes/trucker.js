const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const truckerController = require('../../controllers/trucker');
const middlewares = require('../middlewares');

const router = express.Router();

module.exports = app => {
    app.use('/truckers', router);

    router.put(
        '/:id',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        celebrate.celebrate({
            body: celebrate.Joi.object({
                route_info: celebrate.Joi.string().required(),
                tracker_ability: celebrate.Joi.boolean().required(),
                details: celebrate.Joi.string().required(),
                images: celebrate.Joi.array().max(3)
            }),
        }),
        eah(truckerController.update)
    );

    router.get('/:id', eah(truckerController.get));

    router.get('', eah(truckerController.fetch));



};
