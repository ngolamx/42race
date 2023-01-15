const axios = require('../utils/axios')
const moment = require('moment')
const { log } = require('../utils/logger')
const Activity = require('../models/activity');
const factory = require('./handlerFactory');

exports.addNewlyActivities = async function (req, res) {
    if (req.user) {
        const epochTimestamp = moment().utc().subtract(3, 'days').unix()
        const resp = await axios.get('/athlete/activities', {
            headers: {
                'Authorization': 'Bearer ' + req.user.token
            },
            params: { after: epochTimestamp }
        })

        try {
            // ignore errors and continue with option ordered: false
            await Activity.insertMany(resp.data, { ordered: false })
        } catch(err) {
            log.info("Inserted ids: " + err.insertedIds)
        }
    } else {
        log.info("The connection was revoked. Please connect again.")
    }
    res.sendStatus(201)
}


exports.getAllActivities = factory.getAll(Activity);
exports.getActivity = factory.getOne(Activity);
exports.createActivity = factory.createOne(Activity);
exports.updateActivity = factory.updateOne(Activity);
exports.deleteActivity = factory.deleteOne(Activity);
