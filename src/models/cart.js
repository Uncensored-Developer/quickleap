'use strict';


module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {});
    Cart.associate = function (models) {
        // associations can be defined here
    };
    return Cart;
};
