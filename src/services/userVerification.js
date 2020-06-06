const randomNumber = require('random-number-csprng');
const userService = require('../services/user');
const VerificationCode = require('../models').VerificationCode;


module.exports = class UserVerificationService {

    constructor(container) {
        this.userService = container.get(userService);
        // this.logger = container.get('logger');
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

};