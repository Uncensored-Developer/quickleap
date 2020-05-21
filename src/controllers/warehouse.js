const typedi = require('typedi');
const warehouseService = require('../services/warehouse');
const warehouseImageService = require('../services/warehouseimage');
const BaseController = require('./base');


module.exports = class WarehouseController {

    static get warehouseService() { return typedi.Container.get(warehouseService); }
    static get warehouseImageService() { return typedi.Container.get(warehouseImageService); }

    static get baseController() {
        return new BaseController(
            WarehouseController.warehouseService, 
            'Warehouse',
            WarehouseController.warehouseImageService
            );
    }

    static async update(req, res) {
        return WarehouseController.baseController.update(req, res);
    }

    static async fetch(req, res) {
        return WarehouseController.baseController.fetch(req, res);
    }

    static async get(req, res) {
        return WarehouseController.baseController.get(req, res);
    }

};
