const { DataTypes } = require('sequelize')
const sequelize = require('../utils/connection')

const monthlySurvey = sequelize.define('monthlySurvey',{
    rice: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    sugar: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    oil: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    cornmeal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    milk: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    canned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
})

module.exports = monthlySurvey