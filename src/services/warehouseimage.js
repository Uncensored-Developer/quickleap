const db = require('../models');
const BaseService = require('./base');


module.exports = class WarehouseImageService {

    // eslint-disable-next-line no-unused-vars
    constructor(container) {
        this.service = new BaseService(db.WarehouseImage);
    }

    async create(images) {
        return this.service.bulkCreate(images);
    }

    async fetch(warehouseID) {
        try {
            return await db.WarehouseImage.findAll({
                limit: 3,
                where: { WarehouseId: warehouseID }
            })
        } catch (e) {
            throw e;
        }
    }

    async update(id, image) {
        return this.service.update(id, image)
    }

    async delete(id) {
        return this.service.delete(id);
    }

    async get_attrs() {
        return this.service.get_attributes();
    }

};
