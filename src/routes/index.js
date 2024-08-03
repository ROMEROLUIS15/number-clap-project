const express = require('express')
const userRouter = require('./user.router')
const monthlySurveyRouter = require('./monthlySurvey.router.')
const numberClapRouter = require('./numberClap.router')
const SendCodeRouter = require('./SendCode.router')
const verifyCodeSendedRouter = require('./verifyCodeSended.router')

const router = express.Router()

router.use(userRouter)
router.use(monthlySurveyRouter)
router.use(numberClapRouter)
router.use(SendCodeRouter)
router.use(verifyCodeSendedRouter)

module.exports = router