'use strict';


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // is_verified: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    referral_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
  },
    account_type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Farmer);
    User.hasOne(models.Trader);
    User.hasOne(models.Trucker);
    User.hasOne(models.Warehouse);
    User.hasOne(models.Referral);
  };
  return User;
};
