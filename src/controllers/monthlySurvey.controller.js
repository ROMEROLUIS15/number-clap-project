const catchError = require('../middlewares/catchError')
const monthlySurvey = require('../models/monthlySurvey')

const getAllSurvey = catchError(async (req, res) => {
    const survey = await monthlySurvey.findAll()
    res.json(survey)
})

const createSurvey = catchError(async (req, res) => {
    const { rice, oil, sugar, milk, canned, cornmeal, userId } = req.body

    if (!rice || !oil || !sugar || !milk || !canned || !cornmeal || !userId) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    const survey = await monthlySurvey.create({ rice, oil, sugar, milk, canned, cornmeal, userId })
    res.status(201).json(survey)
})

module.exports = {
    getAllSurvey,
    createSurvey
}
