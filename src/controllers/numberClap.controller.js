const catchError = require('../utils/catchError.js')
const numberClap = require('../models/numberClap.js')
const User = require('../models/User.js')

const getAllNumber = catchError(async(req,res) => {
    const numbersClap = await numberClap.findAll({
        include: [
        {model: User, 
        as: 'user',
        attributes: { exclude: ["password"] 
        }}]})
    return res.send(numbersClap)
})

const createNumberClap = catchError(async(req,res) => {
    const { uniqueNumberClap, amount, quantity, userId } = req.body
    const result = await numberClap.create({
        uniqueNumberClap,
        quantity,
        userId,
        amount
    })
    return res.json(result)
})

const getOneNumberClap = catchError(async(req,res) => {
    const { id } = req.params
    const result = await numberClap.findOne({
        where: { id },
        include: [{model: User,
            attributes: ["name", "phone"] }]
            })
            return res.json(result)
})

const updateNumberClap = catchError(async(req,res) => {
    const { id } = req.params
    const { uniqueNumberClap, amount, quantity, userId } = req.body
    const result = await numberClap.update({
        uniqueNumberClap,
        amount,
        quantity,
        userId
    }, {where: {id}, returning: true})

    return res.json(result)
})

const getUserByUniqueNumberClap = catchError(async (req, res) => {
    const { uniqueNumberClap } = req.body;

    if (!uniqueNumberClap) {
        return res.status(400).json({ error: "Reference number is required" });
    }

    const numberClapEntry = await numberClap.findOne({
        where: { uniqueNumberClap },
        include: [{
            model: User,
            as: 'user', // Asegúrate de usar el alias definido en la relación
            attributes: ["id", "name", "email", "phone"]
        }]
    })

        //console.log("numberClapEntry:", numberClapEntry); // Agrega un log para depurar

    if (!numberClapEntry) {
        return res.status(404).json({ error: "NumberClap not found" });
    }

        const user = numberClapEntry.user; // Asegúrate de usar el alias correcto

        //console.log("User:", user); // Agrega un log para depurar

        if (!user) {
             return res.status(404).json({ error: "User not found for the provided NumberClap" });
         }

        return res.json(numberClapEntry.user);
})


module.exports = {
    getAllNumber,
    createNumberClap,
    getOneNumberClap,
    updateNumberClap,
    getUserByUniqueNumberClap
}