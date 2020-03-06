const db = require('../models');


module.exports = class UserService {

  constructor(container) {

  }

  async createUser(user) {
    try {
      return await db.User.create(user);
    } catch (e) {
      throw e;
    }
  }

  async getUser(username) {
    return await db.User.findOne({
      where: {username: username}
    });
  }

};
