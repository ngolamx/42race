const express = require('express')
const passport = require('passport')
const StravaStrategy = require('passport-strava-oauth2').Strategy
const { ensureAuthenticated } = require('../utils/common')

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
    res.redirect('/authorize/auth-success');
  });

router.use(ensureAuthenticated)
router.get('/auth-success', function(req, res, next){
    const userID = req.user.id
    res.render('auth-success', { athletUrl: `https://wwww.strava.com/athletes/${userID}`})
});
router.get('/disconnect', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router