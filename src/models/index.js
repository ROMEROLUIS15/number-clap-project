const monthlySurvey = require('./monthlySurvey.js')
const numberClap = require('./numberClap.js')
const User = require('./User.js')

User.hasMany(monthlySurvey)
monthlySurvey.belongsTo(User)

// User.hasMany(numberClap)
// numberClap.belongsTo(User)

numberClap.belongsTo(User);
User.hasMany(numberClap)
