'use strict';


module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define('Business', {
        name: {
            type: DataTypes.STRING(350),
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        logo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {});
    // eslint-disable-next-line no-unused-vars
    Business.associate = function (models) {
        // associations can be defined here
    };
    return Business;
};
