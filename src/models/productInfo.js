'use strict';


module.exports = (sequelize, DataTypes) => {
    const ProductInfo = sequelize.define('ProductInfo', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        grade: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, {});
    // eslint-disable-next-line no-unused-vars
    ProductInfo.associate = function (models) {
        // associations can be defined here
    };
    return ProductInfo;
};
