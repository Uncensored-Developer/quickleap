const db = require('../models');
const BaseService = require('./base');


module.exports = class CartService {

    // eslint-disable-next-line no-unused-vars
    constructor(container) {
        this.service = new BaseService(db.Cart);
    }

    async create(cart) {
        return this.service.create(cart);
    }

    async get(query) {
        return this.service.get(query);
    }

    async fetch({ limit, offset, order_by, sort, fields, exclude }) {
        return this.service.fetch({ limit, offset, order_by, sort, fields, exclude });
    }

    async update(uuid, cart) {
        return this.service.update(uuid, cart)
    }

    async delete(id) {
        return this.service.delete(id);
    }

    async get_attrs() {
        return this.service.get_attributes();
    }

};
