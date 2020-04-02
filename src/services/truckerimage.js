const db = require('../models');
const BaseService = require('./base');


module.exports = class TruckerImageService {

    constructor(container) {
        this.service = new BaseService(db.TruckerImage);
    }

    async create(images) {
        return this.service.bulkCreate(images);
    }

    async fetch(trukerID) {
        try {
            return await db.TruckerImage.findAll({
                limit: 3,
                where: { TruckerId: trukerID }
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
