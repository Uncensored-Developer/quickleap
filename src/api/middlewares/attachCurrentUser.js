const typedi = require('typedi');
const userService = require('../../services/user');


module.exports = (req, res, next) => {

    const Logger = typedi.Container.get('logger');
    const userServiceInstance = typedi.Container.get(userService);
    try {
        const user = userServiceInstance.getUser(req.token.username);
        if (!user) {
            return res.sendStatus(404);
        }
        req.user = user;
        return next();
    } catch (e) {
        Logger.error('🔥 Error attaching user to req: %o', e);
        return next(e);
    }

};
