const db = require('../models');
const BaseService = require('./base');


module.exports = class TraderService {

  constructor(container) {
    this.service = new BaseService(db.Trader);
  }

  async create(trader) {
    return this.service.create(trader);
  }

  async get(id) {
    return this.service.get(id);
  }

  async fetch({limit, offset, order_by, sort, fields}) {
    return this.service.fetch({limit, offset, order_by, sort, fields});
  }

  async update(id, trader) {
    return this.service.update(id, trader)
  }

  async delete(id) {
    return this.service.delete(id);
  }

  async get_attrs() {
    return this.service.get_attributes();
  }

};
