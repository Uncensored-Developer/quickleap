'use strict';


module.exports = (sequelize, DataTypes) => {
  const Trader = sequelize.define('Trader', {
    classification: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    focus_area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price_details: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quality: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  Trader.associate = function(models) {
    // associations can be defined here
  };
  return Trader;
};
