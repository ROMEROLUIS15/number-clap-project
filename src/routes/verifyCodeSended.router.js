const express = require('express')
const verifyCodeFromRegister = require('../controllers/verifyCodeSended.controller')
const verifyCodeSendedRouter = express.Router()

verifyCodeSendedRouter.route('/verify-code')
.post(verifyCodeFromRegister)

module.exports = verifyCodeSendedRouter