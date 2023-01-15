const axios = require('../utils/axios')
const { log } = require('../utils/logger')

exports.addNewlyActivities = async function (req, res) {
    if (req.user) {
        const resp = await axios.get('/athlete/activities', {
            headers: {
                'Authorization': 'Bearer ' + req.user.token
            }
        })
        console.log("ACT", resp.data)
    } else {
        log.info("The connection was revoked. Please connect again.")
    }
}
