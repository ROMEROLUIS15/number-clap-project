const { DataTypes } = require('sequelize')
const sequelize = require('../utils/connection')

const numberClap = sequelize.define('numberClap',{
    uniqueNumberClap: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
})

module.exports = numberClap