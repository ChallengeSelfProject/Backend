require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const app = express()
const cloudinary = require('cloudinary').v2
const URL = '/api/v1'
app.use(cors())
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // Add parentheses here
app.use(logger('dev'))
app.use(cookieParser())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

console.log(cloudinary.config())

// routes
app.get(`${URL}/`, (req, res) => {
  // kirim status 200 dan pesan
  res.status(200).json({ message: 'Welcome to API v1' })
})

app.use(`${URL}`, require('./app/Role/role.router'))
app.use(`${URL}`, require('./app/Challenge/challenge.router'))

// api
// app.use(`${URL}/`, apiRoute);
// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // send error
  res.status(err.status || 500)
  res.json({ error: err })
})
app.use((req, res, next) => {
  const error = createError(404)
  res.status(error.status).json({ error: error.message })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app
