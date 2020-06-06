const typedi = require('typedi');
const Util = require('../utils/utils');
const userService = require('../services/user');
const authService = require('../services/auth');
const userVerificationService = require('../services/userVerification');
const config = require('../config');


const util = new Util();


module.exports = class AuthController{

  static get authService() { return typedi.Container.get(authService); }
  static get userService() { return typedi.Container.get(userService); }
  static get userVerificationService() { return typedi.Container.get(userVerificationService); }

  static async register(req, res) {
    const user = await AuthController.userService.getUser(req.body.username);
    if (!user) {
      const result = await AuthController.authService.signUp(req.body);
      const msg = 'User Registered.';
      util.setSuccess(201, msg, result);
    } else {
      const msg = 'A user with this phone number already exists.';
      util.setError(400, msg);

    }
    return util.send(res);
  }

  static async login(req, res) {
    const result = await AuthController.authService.signIn(req.body);
    if (result == null || result === 'invalid_password') {
      const msg = 'Invalid login details.';
      util.setError(400, msg);
    } else {
      const msg = 'Login Successful';
      util.setSuccess(200, msg, result);
    }
    return util.send(res);
  }

  static async changePassword(req, res) {
    const result = await AuthController.authService.changePassword(req.user, req.body);

    if (result == null || result === 'invalid_password') {
      const msg = 'Invalid Password';
      util.setError(400, msg);
    } else {
      const msg = 'Password Changed.';
      util.setSuccess(200, msg, result);
    }
    return util.send(res);
  }

  static async initiateVerification(req, res) {
    const result = await AuthController.userVerificationService.createVerificationCode(req.user);

    if (result) {
      const data = { code: null };
      const msg = 'Verification code sent';
      if (config.live === 'false') {
        data.code = result.code;
      }
      util.setSuccess(200, msg, data);
    } else {
      const msg = 'Something went wrong. Try again later.';
      util.setError(500, msg);

    }
    return util.send(res);
  }

};
