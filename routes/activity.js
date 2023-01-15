const express = require('express');
const activityController = require('../controllers/activities');

const router = express.Router();

router
  .route('/')
  .get(activityController.getAllActivities)
  .post(activityController.createActivity);

router
  .route('/:id')
  .get(activityController.getActivity)
  .patch(activityController.updateActivity)
  .delete(activityController.deleteActivity)

module.exports = router;
