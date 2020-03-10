'use strict';


module.exports = (sequelize, DataTypes) => {
  const WarehouseImage = sequelize.define('WarehouseImage', {
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {});
  WarehouseImage.associate = function(models) {
    WarehouseImage.belongsTo(models.Warehouse);
  };
  return WarehouseImage;
};
