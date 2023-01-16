const mongoose = require('mongoose')

const accountScheme = new mongoose.Schema(
    {
        // Athlete id
        id : {
            type: Number,
            required: [true, 'An account must have an id'],
            unique: true,
        },
        username : String,
        firstname : String,
        lastname : String,
        city : String,
        state : String,
        country : String,
        sex : String,
        premium : Boolean,
    }
)

accountScheme.index({ id: 1 })
const Account = mongoose.model('Account', accountScheme)

module.exports = Account