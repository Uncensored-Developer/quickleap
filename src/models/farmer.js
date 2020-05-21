'use strict';


module.exports = (sequelize, DataTypes) => {
  const Farmer = sequelize.define('Farmer', {
    classification: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    focus_area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    yield_per_hectare: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quality_control: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  Farmer.associate = function(models) {
    // associations can be defined here
  };
  return Farmer;
};
