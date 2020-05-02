const isAuth = require('./isAuth');
const attachCurrentUser = require('./attachCurrentUser');
const isAggregatorOrAdmin = require('./isAggregatorOrAdmin');
const isTraderOrAggregatorOrAdmin = require('./isTraderOrAggregatorOrAdmin');


module.exports = {
    isAuth,
    attachCurrentUser,
    isAggregatorOrAdmin,
    isTraderOrAggregatorOrAdmin
};
