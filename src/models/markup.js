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
    // eslint-disable-next-line no-unused-vars
    MarkUp.associate = function (models) {
        // associations can be defined here
    };
    return MarkUp;
};
