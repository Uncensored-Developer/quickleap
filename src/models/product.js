'use strict';


module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        slug: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        uuid: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        }
    }, {});
    Product.associate = function (models) {
        // associations can be defined here
    };
    return Product;
};
