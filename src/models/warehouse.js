'use strict';


module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('Warehouse', {
    size: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    price_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    focus_area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  Warehouse.associate = function(models) {

  };
  return Warehouse;
};
