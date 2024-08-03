const jwt = require('jsonwebtoken')
const blackList = require('./blackList')
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1] 

    if (blackList.has(token)) return res.sendStatus(403)

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.user
            next()
        }
    )
}


module.exports = verifyJWT