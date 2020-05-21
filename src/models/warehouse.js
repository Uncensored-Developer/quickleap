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
  // eslint-disable-next-line no-unused-vars
  Warehouse.associate = function(models) {

  };
  return Warehouse;
};
