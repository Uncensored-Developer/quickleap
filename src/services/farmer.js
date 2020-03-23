const db = require('../models');
const BaseService = require('./base');


module.exports = class FarmerService {

  constructor(container) {
    this.service = new BaseService(db.Farmer);
  }

  async create(farmer) {
    return this.service.create(farmer);
  }

  async get(id) {
    return this.service.get(id);
  }

  async fetch({limit, offset, order_by, sort, fields}) {
    return this.service.fetch({limit, offset, order_by, sort, fields});
  }

  async update(id, farmer) {
    return this.service.update(id, farmer)
  }

  async delete(id) {
    return this.service.delete(id);
  }

  async get_attrs() {
    return this.service.get_attributes();
  }

};
