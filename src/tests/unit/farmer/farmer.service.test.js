const typedi = require('typedi');
const farmerService = require('../../../services/farmer');
const expect = require('chai').expect;

describe('Farmer service unit tests', () => {

  const farmerServiceInstance = typedi.Container.get(farmerService);

  describe('CreateFarmer', () => {
    it('should create and return farmer record', async () => {
      const userInput = {
        userId: 1
      };

      const farmerRecord = await farmerServiceInstance.create(userInput);

      expect(farmerRecord).to.have.property('id');
    });
  });

  describe('GetFarmer', () => {
    it('should return farmer record with the passed id', async () => {
      const id = 1;

      const farmerRecord = await farmerServiceInstance.get(id);

      expect(farmerRecord).to.have.property('id');
      expect(farmerRecord.id).to.equal(id);
    });
  });

  describe('UpdateFarmer', () => {
    it('should update the farmer with the passed id and return the updated farmer record', async () => {
      const id = 1;
      const input = {
        classification: 'class',
        focus_area: 5474,
        yield_per_hectare: 678
      };

      await farmerServiceInstance.update(id, input);
      const farmerRecord = await farmerServiceInstance.get(id);

      expect(farmerRecord).to.have.property('id');
      expect(farmerRecord.id).to.equal(id);
      expect(farmerRecord.classification).to.equal(input.classification);
      expect(farmerRecord.focus_area).to.equal(input.focus_area);
      expect(farmerRecord.yield_per_hectare).to.equal(input.yield_per_hectare);
    });
  });

  describe('DeleteFarmer', () => {
    it('should delete the farmer with the passed id and return the deleted farmer id', async () => {
      const id = 1;

      const farmerRecord1 = await farmerServiceInstance.delete(id);
      const farmerRecord = await farmerServiceInstance.get(id);

      expect(farmerRecord1).to.equal(id);
      expect(farmerRecord).to.equal(null);
    });
  });


});
