const blackList = require("./blackList");

const extractToken = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
};

const isTokenValid = (token) => {
    if (!token || blackList.has(token)) {
        return false;
    }
    return true;
};

module.exports = {
    extractToken,
    isTokenValid
};
