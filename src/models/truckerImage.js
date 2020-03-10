'use strict';


module.exports = (sequelize, DataTypes) => {
  const TruckerImage = sequelize.define('TruckerImage', {
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {});
  TruckerImage.associate = function(models) {
    TruckerImage.belongsTo(models.Trucker);
  };
  return TruckerImage;
};
