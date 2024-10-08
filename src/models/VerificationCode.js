const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

const VerificationCode = sequelize.define('VerificationCode', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = VerificationCode;