const typedi = require('typedi');
const Util = require('../utils/utils');
const truckerService = require('../services/trucker');
const BaseController = require('./base');


module.exports = class TruckerController {

    static get truckerService() { return typedi.Container.get(truckerService); }

    static get baseController() {
        return new BaseController(TruckerController.truckerService, 'Trucker');
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
