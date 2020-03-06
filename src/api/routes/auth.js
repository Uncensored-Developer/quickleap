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
          'aggregator', 'farmer', 'warehouse', 'trader', 'inputs', 'truckers'
        ).required(),
        password: celebrate.Joi.string().min(6).required(),
      }),
    }),
    authController.register
    // eah(async (req, res) => {
    //   const logger = typedi.Container.get('logger');
    //   logger.debug('Calling register endpoint with body: %o', req.body);
    //
    //   const authService = typedi.Container.get(auth);
    //   const result = await authService.signUp(req.body);
    //   return res.status(201).json(result);
    // })
  );

};
