const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const typedi = require('typedi');
const authController = require('../../controllers/auth');

const router = express.Router();

module.exports = app => {
  app.use('/auth', router);

  router.post(
    '/register',
    celebrate.celebrate({
      body: celebrate.Joi.object({
        username: celebrate.Joi.string().max(11).required(),
        account_type: celebrate.Joi.string().valid(
          'aggregator', 'farmer', 'warehouse', 'trader', 'inputs', 'trucker'
        ).required(),
        password: celebrate.Joi.string().min(6).required(),
      }),
    }),
    eah(authController.register)
  );

  router.post(
    '/login',
    celebrate.celebrate({
      body: celebrate.Joi.object({
        username: celebrate.Joi.string().required(),
        password: celebrate.Joi.string().required(),
      }),
    }),
    eah(authController.login)
  );

};
