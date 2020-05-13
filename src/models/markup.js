'use strict';


module.exports = (sequelize, DataTypes) => {
    const MarkUp = sequelize.define('MarkUp', {
        entity: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        percent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {});
    MarkUp.associate = function (models) {
        // associations can be defined here
    };
    return MarkUp;
};
