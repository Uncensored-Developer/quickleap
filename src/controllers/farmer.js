const typedi = require('typedi');
const Util = require('../utils/utils');
const farmerService = require('../services/farmer');


const util = new Util();


module.exports = class FarmerController{

  static get farmerService() { return typedi.Container.get(farmerService); }

  static async update(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
        const msg = 'Please input a valid numeric id.';
        util.setError(400, msg);
        return util.send(res);
    }

    const farmer = await FarmerController.farmerService.getFarmer(id);

    if (!farmer) {
        const msg = 'Farmer not found.';
        util.setError(404, msg);
    } else {
        if (farmer.UserId !== req.token.id) {
            const msg = 'You are not permitted to update this farmer.';
            util.setError(403, msg);
            return util.send(res);
        }
        const updatedFarmer = await FarmerController.farmerService.updateFarmer(id, req.body);
        const msg = 'Farmer updated.';
        util.setSuccess(200, msg, updatedFarmer);
    }

    return util.send(res);
  }

  static async fetch(req, res) {
    const farmers = await FarmerController.farmerService.fetchFarmers(req.body);

    if (farmers.length > 0) {
        const msg = 'Farmers retrieved.';
        util.setSuccess(200, msg, farmers)
    } else {
        const msg = 'No Farmers found.';
        util.setSuccess(200, msg);
    }
    return util.send(res);
  }

  static async get(req, res) {
      const {id} = req.params;

      if (!Number(id)) {
          const msg = 'Please input a valid numeric value';
          util.setError(400, msg);
          return util.send(res);
      }

      const farmer = await FarmerController.farmerService.getFarmer(id);
      if (!farmer) {
          const msg = 'Farmer not found.';
          util.setError(404, msg);
      } else {
          const msg = 'Farmer found.';
          util.setSuccess(200, msg, farmer)
      }
      return util.send(res);
  }

};
