'use strict';
const express = require('express')

const router = express.Router()

router.post('/', (req, res) => {
    // TODO create activities records
});
router.get('/', (req, res) => {
  const VERIFY_TOKEN = process.env.STRAVA_VERIFY_TOKEN;
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {     
      console.log('WEBHOOK_VERIFIED');
      res.json({"hub.challenge":challenge});  
    } else {
      res.sendStatus(403);      
    }
  }
});

module.exports = router