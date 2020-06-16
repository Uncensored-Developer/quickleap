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

}
