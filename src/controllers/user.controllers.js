const catchError = require('../../utils/catchError.js')
const monthlySurvey = require('../models/monthlySurvey.js')
const User = require('../models/User.js')
const numberClap = require('../models/numberClap.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blackList = require('../../utils/blackList.js')
const { extractToken, isTokenValid } = require('../../utils/authUtils.js')
const SendCode = require('../models/SendCode.js')

const getAllUsers = catchError(async(req, res) => {
    const users = await User.findAll({include: [
        {model: monthlySurvey, as: 'monthlySurveys'}, 
        {model: numberClap, as: 'numberClaps'}
    ]})
    return res.json(users)
})

const createUser = catchError(async(req,res) => {
    const { name, lastName, identification, email, password, phone } = req.body

    const registeredUser = await User.findOne({ where: { email } });
    if (registeredUser) {
        return res.status(400).json({ message: 'Email is already registered.' })
    }

    const registeredIdentification = await User.findOne({ where: { identification } });
    if (registeredIdentification) {
        return res.status(400).json({ message: 'Identification is already registered.' })
    }

    const encriptedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ 
        name,
        lastName, 
        identification,
        email, 
        password: encriptedPassword,
        phone
    })

    // Registra el correo electrónico en SendCode
    await SendCode.create({ email });

    return res.status(201).json(user)
})

const getUser = catchError(async(req,res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    return res.json(user)
})

const deleteUser = catchError(async(req,res) => {
    const { id } = req.params
    const user = await User.destroy({where: {id}})
    return res.sendStatus(204)
})

const updateUser = catchError(async(req,res) => {
    const { id } = req.params
    const { name, lastName, phone, numberClap } = req.body
    const user = await User.update({
        name,
        lastName,
        phone,
        numberClap
    }, {where: {id}, returning: true})
    return res.json(user)
})

const login = catchError(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: {email} });
    if(!user) return res.status(401).json({ error: "Invalid credentials"})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({ error: "Invalid credentials"});

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
         { expiresIn: '1h' }
)
    return res.json({ user, token });
})

const getLoggedUser = catchError(async (req, res) => {
    const authHeader = req.headers.authorization
    const token = extractToken(authHeader)

    if (!token) {
        return res.status(401).json({ message: "No token provided or token is invalid" })
    }

    if (!isTokenValid(token)) {
        return res.status(403).json({ message: "Token is invalid or expired" })
    }

    const userId = req.user.id
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
    })

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    return res.json(user)
})

const logout = catchError(async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
        return res.status(401).json({ message: "No token provided or token is invalid" });
    }

    if (!isTokenValid(token)) {
        return res.status(400).json({ message: "Token has already been used for logout" });
    }

    blackList.add(token);
    return res.json({ message: "Successfully logged out" });
})




module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    login,
    getLoggedUser,
    logout
}