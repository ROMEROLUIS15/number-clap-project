const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./utils/errorHandler')
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/clap', router)

app.get('/', (req,res) => {
    return res.send('number clap')
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
})

app.use(errorHandler)

module.exports = app