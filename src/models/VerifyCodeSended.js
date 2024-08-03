// models/VerifyCodeSended.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection.js');

const VerifyCodeSended = sequelize.define('VerifyCodeSended', {
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

module.exports = VerifyCodeSended;
