'use strict';


module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        region: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ordered'
        },
        order_id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },

    }, {});
    // eslint-disable-next-line no-unused-vars
    Order.associate = function (models) {
        // associations can be defined here
        Order.hasOne(models.OrderItem);
    };
    return Order;
};
