'use strict';


module.exports = (sequelize, DataTypes) => {
  const Referral = sequelize.define('Referral', {

  }, {});
  Referral.associate = function(models) {
    Referral.belongsTo(models.User, {foreignKey: 'aggregator'});
  };
  return Referral;
};
