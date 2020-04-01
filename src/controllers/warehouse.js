const typedi = require('typedi');
const Util = require('../utils/utils');
const warehouseService = require('../services/warehouse');
const BaseController = require('./base');


module.exports = class WarehouseController {

    static get truckerService() { return typedi.Container.get(warehouseService); }

    static get baseController() {
        return new BaseController(WarehouseController.truckerService, 'Warehouse');
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
