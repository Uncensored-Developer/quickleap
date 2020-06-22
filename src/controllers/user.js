const User = require('../models').User;
const Util = require('../utils/utils');


const util = new Util();

module.exports = class UserController {

    static async getUser(req, res) {

        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ['password', 'salt'] }
        });

        if (!user) {
            const msg = 'User not found';
            util.setError(404, msg);
        } else {
            const msg = 'User found.'
            util.setSuccess(200, msg, user);
        }

        return util.send(res);

    }

    static async updateUser(req, res) {

        const user = await User.update(
            req.body, 
            { 
                where: { id: req.user.id } 
            }
        );

        if (!user) {
            const msg = 'Something went wrong try again later';
            util.setError(500, msg);
        } else {
            const msg = 'User details updated'
            util.setSuccess(200, msg, req.body);
        }

        return util.send(res);

    }

}
