const typedi = require('typedi');
const Util = require('../utils/utils');
const helpers = require('../utils/helpers');
const farmerService = require('../services/farmer');


const util = new Util();


module.exports = class BaseController {

  constructor(service, noun) {
      this.service = service;
      this.noun = noun;
  }

  async update(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
        const msg = 'Please input a valid numeric id.';
        util.setError(400, msg);
        return util.send(res);
    }

    const obj = await this.service.get(id);

    if (!obj) {
        const msg = `${this.noun} not found.`;
        util.setError(404, msg);
    } else {
        if (obj.UserId !== req.token.id) {
            const msg = `You are not permitted to update this ${this.noun}.`;
            util.setError(403, msg);
            return util.send(res);
        }
        const updatedObj = await this.service.update(id, req.body);
        const msg = `${this.noun} updated.`;
        util.setSuccess(200, msg, updatedObj);
    }

    return util.send(res);
  }

  async fetch(req, res) {
    const params = helpers.getParams(req);

    const allowed_filters = ['classification', 'focus_area', 'yield_per_hectare', 'quality_control'];

    helpers.checkForInvalidFilter(allowed_filters, params.fields, util, res);

    const farmers = await this.service.fetch(params);

    if (farmers.length > 0) {
        const msg = `${this.noun}s retrieved.`;
        util.setSuccess(200, msg, farmers)
    } else {
        const msg = `No ${this.noun}s found.`;
        util.setSuccess(200, msg);
    }
    return util.send(res);
  }

  async get(req, res) {
      const {id} = req.params;

      if (!Number(id)) {
          const msg = 'Please input a valid numeric value';
          util.setError(400, msg);
          return util.send(res);
      }

      const farmer = await this.service.get(id);
      if (!farmer) {
          const msg = `${this.noun} not found.`;
          util.setError(404, msg);
      } else {
          const msg = `${this.noun} found.`;
          util.setSuccess(200, msg, farmer)
      }
      return util.send(res);
  }

};
