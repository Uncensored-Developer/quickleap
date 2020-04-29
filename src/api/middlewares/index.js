const isAuth = require('./isAuth');
const attachCurrentUser = require('./attachCurrentUser');
const isAggregatorOrAdmin = require('./isAggregatorOrAdmin');


module.exports = {
    isAuth,
    attachCurrentUser,
    isAggregatorOrAdmin
};
