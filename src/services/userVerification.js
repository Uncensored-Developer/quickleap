const randomNumber = require('random-number-csprng');
const moment = require('moment');
const Op = require('sequelize').Op;
const userService = require('../services/user');
const VerificationCode = require('../models').VerificationCode;
const config = require('../config');


module.exports = class UserVerificationService {

    constructor(container) {
        this.userService = container.get(userService);
        this.logger = container.get('logger');
    }

    async createVerificationCode(user) {
        try {
            this.logger.silly('Generating and saving Code');
            let code = await randomNumber(100000, 999999);
            code =  code.toString();
            const result = await VerificationCode.create({
                code,
                UserId: user.id
            })

            // Send CODE

            return result;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async checkVerificationCode(user, code) {
        try {
            // check if the verification code came in the last 5 minutes
            return await VerificationCode.findOne({
                where: {
                    code,
                    UserId: user.id,
                    createdAt: {
                        [Op.gte]: moment().subtract(5, 'minutes').toDate()
                    }
                }
            });
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async deleteVerificationCode(user, code) {
        try {
            return await VerificationCode.destroy({
                where: {
                    code,
                    UserId: user.id
                }
            });
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

};