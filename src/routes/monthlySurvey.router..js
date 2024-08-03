const express = require('express')
const { getAllSurvey, createSurvey } = require('../controllers/monthlySurvey.controller.js')
const monthlySurveyRouter = express.Router()

monthlySurveyRouter.route('/monthlysurvey')
.get(getAllSurvey)
.post(createSurvey)

module.exports = monthlySurveyRouter