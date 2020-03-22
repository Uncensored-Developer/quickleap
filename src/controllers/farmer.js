const typedi = require('typedi');
const Util = require('../utils/utils');
const farmerService = require('../services/farmer');
const BaseController = require('./base');


module.exports = class FarmerController{

  static get farmerService() { return typedi.Container.get(farmerService); }
  static get baseController() {
      return new BaseController(FarmerController.farmerService, 'Farmer');
  }

  static async update(req, res) {
      return FarmerController.baseController.update(req, res);
  }

  static async fetch(req, res) {
    return FarmerController.baseController.fetch(req, res);
  }

  static async get(req, res) {
      return FarmerController.baseController.get(req, res);
  }

};
