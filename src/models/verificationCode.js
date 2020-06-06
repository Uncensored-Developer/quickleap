'use strict';


module.exports = (sequelize, DataTypes) => {
    const VerificationCode = sequelize.define('VerificationCode', {
        code: {
            type: DataTypes.STRING(6),
            allowNull: false,
            unique: true
        },

    }, {});
    // eslint-disable-next-line no-unused-vars
    VerificationCode.associate = function (models) {
        // associations can be defined here
    };
    return VerificationCode;
};
