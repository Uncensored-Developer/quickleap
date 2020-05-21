const db = require('../models');


module.exports = class UserService {

  // eslint-disable-next-line no-unused-vars
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
    try {
      return await db.User.findOne({
        where: {username: username}
      });
    } catch (e) {
      throw e;
    }
  }

};
