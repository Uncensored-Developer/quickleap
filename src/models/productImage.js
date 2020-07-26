'use strict';


module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {});
    ProductImage.associate = function (models) {
        ProductImage.belongsTo(models.Product);
    };
    return ProductImage;
};
