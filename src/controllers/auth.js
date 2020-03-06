const typedi = require('typedi');
const Util = require('../utils/utils');
const userService = require('../services/user');
const authService = require('../services/auth');


const util = new Util();


module.exports = class AuthController{

  static get authService() { return typedi.Container.get(authService); }
  static get userService() { return typedi.Container.get(userService); }

  static async register(req, res) {
    const user = await AuthController.userService.getUser(req.body.username);
    if (!user) {
      const result = await AuthController.authService.signUp(req.body);
      const msg = 'User Registered';
      util.setSuccess(201, msg, result);
      util.send(res);
    } else {
      const msg = 'A user with this phone number already exists.';
      util.setError(400, msg);
      return util.send(res);
    }
  }

};
