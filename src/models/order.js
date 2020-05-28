'use strict';


module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        region: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        shipped: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

    }, {});
    // eslint-disable-next-line no-unused-vars
    Order.associate = function (models) {
        // associations can be defined here
        Order.hasOne(models.OrderItem);
    };
    return Order;
};
