'use strict';


module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, {});
    // eslint-disable-next-line no-unused-vars
    Cart.associate = function (models) {
        // associations can be defined here
    };
    return Cart;
};
