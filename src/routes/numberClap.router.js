const express = require('express')
const { getAllNumber, createNumberClap, getOneNumberClap, updateNumberClap, getUserByUniqueNumberClap } = require('../controllers/numberClap.controller')
const verifyJWT = require('../../utils/verifyJWT.js')

const numberClapRouter = express.Router()

numberClapRouter.route('/numberclap')
.get(getAllNumber)
.post(createNumberClap)

numberClapRouter.route('/numberclap/:id')
.get(getOneNumberClap)
.patch(verifyJWT, updateNumberClap)

numberClapRouter.route('/numberclap/user-by-number')
.post(getUserByUniqueNumberClap)

module.exports = numberClapRouter