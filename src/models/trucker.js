'use strict';


module.exports = (sequelize, DataTypes) => {
  const Trucker = sequelize.define('Trucker', {
    details: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    route_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tracker_ability: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {});
  // eslint-disable-next-line no-unused-vars
  Trucker.associate = function(models) {

  };
  return Trucker;
};
