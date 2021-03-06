const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const uid = require('rand-token').uid;
const typedi = require('typedi');
const Referral = require('../models').Referral;
const events = require('../subscribers/events');
const userService = require('../services/user');
const farmerService = require('../services/farmer');
const traderService = require('../services/trader');
const truckerService = require('../services/trucker');
const warehouseService = require('../services/warehouse');
const businessService = require('../services/business');


module.exports = class AuthService {

  constructor(container) {
    this.userService = container.get(userService);
    // this.smser = container.get('smser');
    this.logger = container.get('logger');
    this.eventEmitter = require('../subscribers/emitter').getInstance();
  }

  async signUp(userInput, referrer) {
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
            referral_code: uid(10).toUpperCase()
          }),
      );

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const accountService = this.getAccountTypeService(userRecord.account_type);

      let accountTypeRecordId = null

      if (userRecord.account_type !== 'aggregator' && userRecord.account_type !== 'admin') {
        const accountTypeRecord = await accountService.create({ UserId: userRecord.id });
        accountTypeRecordId = accountTypeRecord.id
      }

      // this.logger.silly('Sending validation code sms');
      // await this.smser.sendValidationCode(userRecord);
      this.eventEmitter.emit(events.user.signUp, userRecord);

      if (referrer) {
        await this.handleReferral(userRecord.id, referrer.id);
      }

      const user = {
        id: userRecord.id,
        username: userRecord.username,
        account_type: userRecord.account_type,
        referral_code: userRecord.referral_code,
        name: userRecord.name,
        account_type_id: accountTypeRecordId
      };

      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async signIn(userInput) {

    try {
      const userRecord = await this.userService.getUser({username: userInput.username});
      if (!userRecord) { return null;}

      const passwordIsValid = await bcrypt.compare(userInput.password, userRecord.password);
      if (!passwordIsValid) { return 'invalid_password'}

      this.logger.silly('Valid Password');

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      const accountService = this.getAccountTypeService(userRecord.account_type);

      let accountTypeRecordId = null

      if (userRecord.account_type !== 'aggregator' && userRecord.account_type !== 'admin'){
        // get account type details
        const accountTypeRecord = await accountService.get({ UserId: userRecord.id });
        accountTypeRecordId = accountTypeRecord.id
      }

      const user = {
        id: userRecord.id,
        username: userRecord.username,
        account_type: userRecord.account_type,
        referral_code: userRecord.referral_code,
        account_type_id: accountTypeRecordId,
        is_verified: userRecord.is_verified,
        name: userRecord.name
      };

      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }

  }

  async changePassword(user, userInput) {
    try {
      const userRecord = await this.userService.getUser({username: user.username});
      if (!userRecord) { return null; }

      const passwordIsValid = await bcrypt.compare(userInput.old_password, userRecord.password);
      if (!passwordIsValid) { return 'invalid_password' }

      this.logger.silly('Hashing password');

      const hashedPassword = await bcrypt.hash(userInput.new_password, 8);

      const data = {
        password: hashedPassword
      }
      await this.userService.update({username: user.username}, data);

      return 'password_changed';
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  async resetPassword(user, password) {
    try {

      this.logger.silly('Hashing password');

      const hashedPassword = await bcrypt.hash(password, 8);

      const data = {
        password: hashedPassword
      }

      return await this.userService.update({ username: user.username }, data);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  getAccountTypeService(account_type) {
    switch (account_type) {
      case 'farmer':
        return typedi.Container.get(farmerService);
      case 'trader':
        return typedi.Container.get(traderService);
      case 'trucker':
        return typedi.Container.get(truckerService);
      case 'warehouse':
        return typedi.Container.get(warehouseService);
      case 'business':
        return typedi.Container.get(businessService);
      default:
        return null;
    }
  }

  async handleReferral(userId, referrerId) {
    return await Referral.create({
      UserId: userId,
      aggregator: referrerId
    });
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
        is_verified: user.is_verified
      },
      config.jwtSecret,
    );
  }

};
