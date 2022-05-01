const express = require('express')
// const dotenv = require('dotenv').config
const serverless = require('serverless-http')

const PORT = process.env.PORT || 5000

const app = express()

app.use('/', require('./routes/routes'))

module.exports.handler = serverless(app);