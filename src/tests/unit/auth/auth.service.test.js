const typedi = require('typedi');
const expect = require('chai').expect;
const express = require('express');
const authService = require('../../../services/auth');


describe('Auth service unit tests', () => {

  const app = express();


  it('should create a user and return the user object (without the password and salt) and a jwt',
    async () => {
      const userInput = {
        username: '0703782390',
        password: 'cashapp',
        account_type: 'aggregator'
      };

      await require('../../../loaders')({expressApp: app});

      const authServiceInstance = typedi.Container.get(authService);

      const {user, token} = await authServiceInstance.signUp(userInput);

      expect(user).to.not.have.property('password');
      expect(user).to.not.have.property('salt');
      expect(token);
    });

  it('should login with and return null for non existent user', async () => {

    const userInput = {
      username: '6475658',
      password: 'cashapp'
    };

    await require('../../../loaders')({expressApp: app});

    const authServiceInstance = typedi.Container.get(authService);

    const result = await authServiceInstance.signIn(userInput);

    expect(result).to.equal(null);

  });

  it('should login with and return invalid_password for a wrong password', async () => {

    const userInput = {
      username: '0703782390',
      password: 'caspp'
    };

    await require('../../../loaders')({expressApp: app});

    const authServiceInstance = typedi.Container.get(authService);

    const result = await authServiceInstance.signIn(userInput);

    expect(result).to.equal('invalid_password');

  });

  it('should login with and return {user, token} for a correct password', async () => {

    const userInput = {
      username: '0703782390',
      password: 'cashapp'
    };

    await require('../../../loaders')({expressApp: app});

    const authServiceInstance = typedi.Container.get(authService);

    const {user, token} = await authServiceInstance.signIn(userInput);

    expect(user).to.not.have.property('password');
    expect(user).to.not.have.property('salt');
    expect(token);

  });

});
