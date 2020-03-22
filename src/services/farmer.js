const db = require('../models');


module.exports = class FarmerService {

  constructor(container) {

  }

  async createFarmer(farmer) {
    try {
      return await db.Farmer.create(farmer);
    } catch (e) {
      throw e;
    }
  }

  async getFarmer(id) {
    try {
      return await db.Farmer.findOne({
        where: {id: id}
      });
    } catch (e) {
      throw e;
    }
  }

  async fetchFarmers({limit, offset, soft_field, sort}) {
    try {
      return await db.Farmer.findAll({limit: limit, offset: offset, order: [soft_field, sort || 'ASC']});
    } catch (e) {
      throw e;
    }
  }

  async updateFarmer(id, farmer) {
    try {
      await db.Farmer.update(farmer, {where: {id: id}});
      return farmer
    } catch (e) {
      throw e;
    }
  }

  async deleteFarmer(id) {
    try {
      return await db.Farmer.destroy({where: {id: id}});
    } catch (e) {
      throw e;
    }
  }

};
