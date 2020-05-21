const typedi = require('typedi');
const truckerService = require('../services/trucker');
const truckerImageService = require('../services/truckerimage');
const BaseController = require('./base');


module.exports = class TruckerController {

    static get truckerService() { return typedi.Container.get(truckerService); }
    static get truckerImageService() { return typedi.Container.get(truckerImageService); }

    static get baseController() {
        return new BaseController(
            TruckerController.truckerService, 
            'Trucker',
            TruckerController.truckerImageService
            );
    }

    static async update(req, res) {
        return TruckerController.baseController.update(req, res);
    }

    static async fetch(req, res) {
        return TruckerController.baseController.fetch(req, res);
    }

    static async get(req, res) {
        return TruckerController.baseController.get(req, res);
    }

};
