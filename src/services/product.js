const db = require('../models');
const BaseService = require('./base');


module.exports = class ProductService {

    constructor(container) {
        this.service = new BaseService(db.Product);
    }

    async create(product) {
        return this.service.create(product);
    }

    async get(query) {
        return this.service.get(query);
    }

    async fetch({ limit, offset, order_by, sort, fields }) {
        return this.service.fetch({ limit, offset, order_by, sort, fields });
    }

    async update(id, product) {
        return this.service.update(id, product)
    }

    async delete(id) {
        return this.service.delete(id);
    }

    async get_attrs() {
        return this.service.get_attributes();
    }

};