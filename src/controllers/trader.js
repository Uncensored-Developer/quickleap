const typedi = require('typedi');
const Util = require('../utils/utils');
const traderService = require('../services/trader');
const BaseController = require('./base');


module.exports = class TraderController{

  static get traderService() { return typedi.Container.get(traderService); }
  static get baseController() {
      return new BaseController(TraderController.traderService, 'Trader');
  }

  static async update(req, res) {
      return TraderController.baseController.update(req, res);
  }

  static async fetch(req, res) {
    return TraderController.baseController.fetch(req, res);
  }

  static async get(req, res) {
      return TraderController.baseController.get(req, res);
  }

};
