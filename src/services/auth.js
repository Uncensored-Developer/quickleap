const crypto = require('crypto');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../config');
const events = require('../subscribers/events');


module.exports = class AuthService {

  constructor(userService, smser, logger, eventDispatcher) {
    this.userService = userService;
    this.smser = smser;
    this.logger = logger;
    this.eventDispatcher = eventDispatcher;
  }

  async signUp(userInput) {
    try {
      const salt = crypto.randomBytes(32);

      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userInput.password, { salt });

      this.logger.silly('Creating user db record');
      const userRecord =  await this.userService.createUser(
        Object.assign({}, userInput, { salt: salt.toString('hex'), password: hashedPassword }),
      );

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      this.logger.silly('Sending validation code sms');
      await this.smser.sendValidationCode(userRecord);
      this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });


      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
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
        account_type: user.roaccount_typele,
        name: user.name,
        username: user.username,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

};
