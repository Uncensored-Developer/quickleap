/* eslint-disable no-undef */
const typedi = require('typedi');
const userService = require('../../../services/user');
const expect = require('chai').expect;

describe('User service unit tests', () => {

  const userServiceInstance = typedi.Container.get(userService);

  describe('CreateUser', () => {
    it('should create and return user record', async () => {
      const userInput = {
        username: '07049986567',
        password: 'cashapp',
        account_type: 'farmer',
        referral_code: '64956',
        salt: '647456'
      };

      const userRecord = await userServiceInstance.createUser(userInput);

      expect(userRecord).to.have.property('id');
    });
  });

});
