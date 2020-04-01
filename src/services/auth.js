const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const uid = require('rand-token').uid;
const typedi = require('typedi');
const events = require('../subscribers/events');
const userService = require('../services/user');
const farmerService = require('../services/farmer');
const traderService = require('../services/trader');
const truckerService = require('../services/trucker');
const warehouseService = require('../services/warehouse');


module.exports = class AuthService {

  constructor(container) {
    this.userService = container.get(userService);
    // this.smser = container.get('smser');
    this.logger = container.get('logger');
    this.eventEmitter = require('../subscribers/emitter').getInstance();
  }

  async signUp(userInput) {
    try {
      const salt = crypto.randomBytes(32);

      this.logger.silly('Hashing password');

      const hashedPassword = await bcrypt.hash(userInput.password, 8);

      this.logger.silly('Creating user db record');
      const userRecord =  await this.userService.createUser(
        Object.assign(
          {},
          userInput,
          {
            salt: salt.toString('hex'),
            password: hashedPassword,
            referral_code: uid(10)
          }),
      );

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const accountTypeRecord = await this.createAccountTypeRecord(
        userRecord.account_type, {UserId: userRecord.id});

      // this.logger.silly('Sending validation code sms');
      // await this.smser.sendValidationCode(userRecord);
      this.eventEmitter.emit(events.user.signUp, userRecord);

      const user = {
        id: userRecord.id,
        username: userRecord.username,
        account_type: userRecord.account_type,
        referral_code: userRecord.referral_code,
        name: userRecord.name,
        account_type_id: accountTypeRecord.id
      };

      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async signIn(userInput) {

    try {
      const userRecord = await this.userService.getUser(userInput.username);
      if (!userRecord) { return null;}

      const passwordIsValid = await bcrypt.compare(userInput.password, userRecord.password);
      if (!passwordIsValid) { return 'invalid_password'}

      this.logger.silly('Valid Password');

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      const user = {
        id: userRecord.id,
        username: userRecord.username,
        account_type: userRecord.account_type,
        referral_code: userRecord.referral_code,
        name: userRecord.name
      };

      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }

  }


  async createAccountTypeRecord(account_type, data) {
    switch (account_type) {
      case 'farmer':
        return await typedi.Container.get(farmerService).create(data);
        break;
      case 'trader':
        return await typedi.Container.get(traderService).create(data);
        break;
      case 'trucker':
        return await typedi.Container.get(truckerService).create(data);
        break;
      case 'warehouse':
        return await typedi.Container.get(warehouseService).create(data);
        break;
      default:
        return null;
    }
  }

  generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for userId: ${user.id}`);
    return jwt.sign(
      {
        id: user.id,
        account_type: user.account_type,
        name: user.name,
        username: user.username,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

};
