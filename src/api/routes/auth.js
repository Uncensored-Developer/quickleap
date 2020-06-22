const express = require('express');
const celebrate = require('celebrate');
const eah = require('express-async-handler');
const authController = require('../../controllers/auth');
const userController = require('../../controllers/user');
const middlewares = require('../middlewares');

const router = express.Router();

module.exports = app => {
  app.use('/auth', router);

  router.post(
    '/register',
    celebrate.celebrate({
      body: celebrate.Joi.object({
        username: celebrate.Joi.string().max(11).required(),
        account_type: celebrate.Joi.string().valid(
          'aggregator', 'farmer', 'warehouse', 'trader', 'inputs', 'trucker',
          'business'
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

  router.post(
    '/change_password',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate.celebrate({
      body: celebrate.Joi.object({
        old_password: celebrate.Joi.string().required(),
        new_password: celebrate.Joi.string().required(),
      }),
    }),
    eah(authController.changePassword)
  );

  router.post(
    '/send_code',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    eah(authController.initiateVerification)
  );

  router.post(
    '/verify',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate.celebrate({
      body: celebrate.Joi.object({
        code: celebrate.Joi.string().required(),
      }),
    }),
    eah(authController.verifyUser)
  );

  router.post(
    '/start_reset_password',
    celebrate.celebrate({
      body: celebrate.Joi.object({
        username: celebrate.Joi.string().required(),
      }),
    }),
    eah(authController.initiateResetPassword)
  );

  router.post(
    '/reset_password',
    celebrate.celebrate({
      body: celebrate.Joi.object({
        username: celebrate.Joi.string().required(),
        code: celebrate.Joi.string().required(),
        password: celebrate.Joi.string().required(),
      }),
    }),
    eah(authController.resetPassword)
  );

  router.get(
    '/user',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    eah(userController.getUser)
  );

  router.put(
    '/user',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate.celebrate({
      body: celebrate.Joi.object({
        name: celebrate.Joi.string(),
        dob: celebrate.Joi.date(),
        photo: celebrate.Joi.string(),
        address: celebrate.Joi.string(),
      }),
    }),
    eah(userController.updateUser)
  );

};
