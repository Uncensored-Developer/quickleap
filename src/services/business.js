const db = require('../models');
const BaseService = require('./base');


module.exports = class BusinessService {

    // eslint-disable-next-line no-unused-vars
    constructor(container) {
        this.service = new BaseService(db.Business);
    }

    async create(business) {
        return this.service.create(business);
    }

    async get(query) {
        return this.service.get(query);
    }

    async fetch({ limit, offset, order_by, sort, fields }) {
        return this.service.fetch({ limit, offset, order_by, sort, fields });
    }

    async update(id, business) {
        return this.service.update(id, business)
    }

    async delete(id) {
        return this.service.delete(id);
    }

    async get_attrs() {
        return this.service.get_attributes();
    }

};
