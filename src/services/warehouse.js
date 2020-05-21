const db = require('../models');
const BaseService = require('./base');


module.exports = class WarehouseService {

    // eslint-disable-next-line no-unused-vars
    constructor(container) {
        this.service = new BaseService(db.Warehouse);
    }

    async create(warehouse) {
        return this.service.create(warehouse);
    }

    async get(query) {
        return this.service.get(query);
    }

    async fetch({ limit, offset, order_by, sort, fields }) {
        return this.service.fetch({ limit, offset, order_by, sort, fields });
    }

    async update(id, warehouse) {
        return this.service.update(id, warehouse)
    }

    async delete(id) {
        return this.service.delete(id);
    }

    async get_attrs() {
        return this.service.get_attributes();
    }

};
