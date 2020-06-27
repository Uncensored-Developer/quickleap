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
        classification: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(20),
            defaultValue: 'raw',
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        prices: {
            type: DataTypes.VIRTUAL,
        },
        uuid: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        }
    }, {});
    Product.associate = function (models) {
        // associations can be defined here
        Product.hasOne(models.ProductInfo);
        Product.hasOne(models.Cart);
    };
    return Product;
};
