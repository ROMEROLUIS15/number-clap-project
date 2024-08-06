const express = require('express')
const userRouter = require('./user.router')
const monthlySurveyRouter = require('./monthlySurvey.router.')
const numberClapRouter = require('./numberClap.router')
const passwordRouter = require('./password.route')

const router = express.Router()

router.use(userRouter)
router.use(monthlySurveyRouter)
router.use(numberClapRouter)
router.use(passwordRouter)

module.exports = router