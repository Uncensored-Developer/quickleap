const db = require('../models');


module.exports = class UserService {

  static async createUser(user) {
    return await db.User.create(user);
  }

};
