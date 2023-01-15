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
    }
)

accountScheme.index({ id: 1 })
const Account = mongoose.model('Account', accountScheme)

module.exports = Account