const express = require('express')
const passport = require('passport')
const StravaStrategy = require('passport-strava-oauth2').Strategy
const { ensureAuthenticated } = require('../utils/common')
const Account = require('../models/account')
const { log } = require('../utils/logger')
const axios = require('axios')

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET
const STRAVA_CALLBACK_URL = process.env.STRAVA_CALLBACK_URL

const router = express.Router()

StravaStrategy.prototype.authorizationParams = function(options) {
    return { approval_prompt: options.approvalPrompt }
}


passport.use(new StravaStrategy({
    clientID: STRAVA_CLIENT_ID,
    clientSecret: STRAVA_CLIENT_SECRET,
    callbackURL: STRAVA_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

router.get('/', function(req, res, next){
    passport.authenticate('strava', { scope: ['read,activity:read'], approvalPrompt: "force" })(req, res, next)
  });


router.get('/strava/callback', 
  passport.authenticate('strava', { failureRedirect: '/' }),
  function(req, res) {
    Account.create(req.user._json)
    .catch(err => {
      log.error(err);
    })
    res.redirect('/authorize/auth-success');
  });

router.use(ensureAuthenticated)
router.get('/auth-success', function(req, res, next){
    const userID = req.user.id
    res.render('auth-success', { athletUrl: `https://wwww.strava.com/athletes/${userID}`, token: req.user.token})
});
router.get('/disconnect', async function(req, res){
  try {
    await axios.post('https://www.strava.com/oauth/deauthorize', null, {
        headers: {
            'Authorization': 'Bearer ' + req.user.token
        }
    })
    log.info("Deauthorize successfully!")
  } catch(err) {
    log.err(err.message)
  }
  req.logout();
  res.redirect('/');
});

module.exports = router