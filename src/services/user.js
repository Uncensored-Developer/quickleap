const db = require('../models');
const BaseService = require('./base');



module.exports = class UserService {

  // eslint-disable-next-line no-unused-vars
  constructor(container) {
    this.service = new BaseService(db.User);
  }

  async createUser(user) {
    try {
      return await db.User.create(user);
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(username) {
    try {
      return await db.User.findOne({
        where: {username: username}
      });
    } catch (e) {
      console.log(e);
    }
  }

  async update(id, user) {
    return this.service.update(id, user)
  }

};
