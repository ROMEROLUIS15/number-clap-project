const jwt = require('jsonwebtoken');
const blackList = require('../utils/blackList');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        console.log('No token provided or token is invalid');
        return res.status(401).json({ message: 'No token provided or token is invalid' });
    }

    const token = authHeader.split(' ')[1];

    if (blackList.has(token)) {
        console.log('Token has already been used for logout');
        return res.status(403).json({ message: 'Token has already been used for logout' });
    }

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log('Token is invalid or expired');
                return res.status(403).json({ message: 'Token is invalid or expired' });
            }
            console.log('Decoded token:', decoded);
            req.user = decoded;
            next();
        }
    );
};

module.exports = verifyJWT;
