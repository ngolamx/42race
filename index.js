const express = require('express')
const { logger, errorLogger } = require('./utils/logger')
require('dotenv').config()

const authRoutes = require('./routes/auth')

const app = express()

app.use(logger)
/* static files */
app.use(express.static('public'))
app.use('/authorize', authRoutes)
app.use(errorLogger)


app.listen(process.env.PORT, () => {
  console.log(`42Race listening on port ${process.env.PORT}`)
})
