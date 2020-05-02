const db = require('../models');
const BaseService = require('./base');


module.exports = class ProductInfoService {

    constructor(container) {
        this.service = new BaseService(db.ProductInfo);
    }

    async create(productInfo) {
        return this.service.create(productInfo);
    }

    async get(query) {
        return this.service.get(query);
    }

    async fetch({ limit, offset, order_by, sort, fields, exclude }) {
        return this.service.fetch({ limit, offset, order_by, sort, fields, exclude });
    }

    async update(uuid, productInfo) {
        return this.service.update(uuid, productInfo)
    }

    async delete(id) {
        return this.service.delete(id);
    }

    async get_attrs() {
        return this.service.get_attributes();
    }

};
