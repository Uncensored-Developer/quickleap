const db = require('../models');
const BaseService = require('./base');


module.exports = class TruckerService {

    constructor(container) {
        this.service = new BaseService(db.Trucker);
    }

    async create(trucker) {
        return this.service.create(trucker);
    }

    async get(id) {
        return this.service.get(id);
    }

    async fetch({ limit, offset, order_by, sort, fields }) {
        return this.service.fetch({ limit, offset, order_by, sort, fields });
    }

    async update(id, trucker) {
        return this.service.update(id, trucker)
    }

    async delete(id) {
        return this.service.delete(id);
    }

    async get_attrs() {
        return this.service.get_attributes();
    }

};
