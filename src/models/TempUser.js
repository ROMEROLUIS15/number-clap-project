const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

const TempUser = sequelize.define('TempUser', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = TempUser;
