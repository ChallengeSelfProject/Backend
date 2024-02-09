require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const app = express()
const URL = '/api/v1'
app.use(cors())
const port = process.env.PORT
const Uuid = require('./config/Uuid')

app.use(express.urlencoded({ extended: false }))
app.use(express.json)
app.use(logger('dev'))
app.use(cookieParser())

// api
// app.use(`${URL}/`, apiRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.listen(port, () => {
  console.log('app running on port', port)
  console.log('uuid', Uuid.generate())
})

module.exports = app
