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

  async fetchFarmers({limit, offset, order_by, sort}) {
    try {
      return await db.Farmer.findAll(
          {
            offset: offset, limit: limit,
            order: [
                [order_by, sort.toUpperCase()],
                // [{model: 'Farmer', as: 'Farmer'}, 'id', sort || 'ASC']
            ]
          }
          );
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
