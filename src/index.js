const app = require('./app.js')
const sequelize = require('../utils/connection.js')
require('./models')

const PORT = process.env.PORT || 4000

const main = async() => {
    try {
        await sequelize.authenticate()
        console.log('DB CONNECTED')
        await sequelize.sync()
        app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`)})
    } catch (error) {
        console.log(error)
    }
}

main()