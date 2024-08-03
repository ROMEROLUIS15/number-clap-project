const express = require('express')
const verifyEmailAndSendCode = require('../controllers/SendCode.controllers')

const SendCodeRouter = express.Router()

SendCodeRouter.route('/recover-password')
.post(verifyEmailAndSendCode)

module.exports = SendCodeRouter