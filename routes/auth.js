const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.redirect(`http://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read`)
})

module.exports = router