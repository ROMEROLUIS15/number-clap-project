const catchError = require('../../utils/catchError.js')
const monthlySurvey = require('../models/monthlySurvey.js')

const getAllSurvey = catchError(async(req,res) => {
    const survey = await monthlySurvey.findAll()
    res.status(200).json(survey)
})

const createSurvey = catchError(async(req,res) => {
    const { rice, oil, sugar, milk, canned, cornmeal, userId } = req.body
    const survey = await monthlySurvey.create({rice, oil, sugar, milk, canned, cornmeal, userId})
    res.status(200).json(survey)
})

module.exports = {
    getAllSurvey,
    createSurvey
}