const { DataTypes } = require('sequelize')
const sequelize = require('../utils/connection.js')
require('dotenv').config()

const SendCode = sequelize.define('SendCode', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
})

module.exports = SendCode
