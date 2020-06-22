const typedi = require('typedi');
const businessService = require('../services/business');
const BaseController = require('./base');


module.exports = class BusinessController {

    static get businessService() { return typedi.Container.get(businessService); }

    static get baseController() {
        return new BaseController(BusinessController.businessService, 'Business');
    }

    static async update(req, res) {
        return BusinessController.baseController.update(req, res);
    }

    static async fetch(req, res) {
        return BusinessController.baseController.fetch(req, res);
    }

    static async get(req, res) {
        return BusinessController.baseController.get(req, res);
    }

};
