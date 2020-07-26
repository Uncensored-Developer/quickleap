'use strict';


module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        real_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {});
    // eslint-disable-next-line no-unused-vars
    OrderItem.associate = function (models) {
        // associations can be defined here
    };
    return OrderItem;
};
