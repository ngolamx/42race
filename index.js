const express = require('express')
const mongoose = require('mongoose');
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const { logger, errorLogger, log } = require('./utils/logger')
const { ensureAuthenticated } = require('./utils/common')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const webhookRoutes = require('./routes/webhook')
const accountRoutes = require('./routes/account');
const activityRoutes = require('./routes/activity');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');

const app = express()
app.use(bodyParser.json())

const sess = {
  secret: '42race xyz',
  cookie: {},
  resave: false,
  saveUninitialized: true
}
if (process.env.ENV === 'production') {
  app.set('trust proxy', 1) 
  sess.cookie.secure = true 
}
app.set('view engine', 'pug')
app.use(session(sess))
app.use(passport.initialize());
app.use(passport.session());

app.use(logger)
app.use(express.static('public'))
app.use('/webhook', webhookRoutes)
app.use('/authorize', authRoutes)
app.use(ensureAuthenticated)
app.use('/api/accounts', accountRoutes)
app.use('/api/activities', activityRoutes)
app.use(errorLogger)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController)



const port = process.env.PORT | 80
app.listen(port, () => {
  log.info(`42Race listening on port ${port}`)
})

try {
  mongoose
    .set('strictQuery', true)
    .connect(process.env.MONGODB_URL, {
      autoIndex: true
    })
} catch(err) {
  log.error(err)
}