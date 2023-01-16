const mongoose = require('mongoose')

const activityScheme = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: [true, 'An activity must have an id'],
            unique: true
        },
        resource_state: Number,
        athlete: {
            // Account id
            id: Number,
            resource_state: Number
        },
        name: String,
        distance: Number,
        moving_time: Number,
        elapsed_time: Number,
        total_elevation_gain: Number,
        type: String,
        sport_type: String,
        workout_type: String,
        start_date: Date,
        start_date_local: Date,
        timezone: String,
        utc_offset: Number,
        location_city: String,
        location_state: String,
        location_country: String,
        achievement_count: Number,
        kudos_count: Number,
        comment_count: Number,
        athlete_count: Number,
        photo_count: Number,
        map: {
            id: String,
            summary_polyline: String,
            resource_state: Number
        },
        trainer: Boolean,
        commute: Boolean,
        manual: Boolean,
        private: Boolean,
        visibility: String,
        flagged: Boolean,
        gear_id: String,
        start_latlng: [String],
        end_latlng: [String],
        average_speed: Number,
        max_speed: Number,
        has_heartrate: Boolean,
        heartrate_opt_out: Boolean,
        display_hide_heartrate_option: Boolean,
        upload_id: String,
        external_id: String,
        from_accepted_tag: Boolean,
        pr_count: Number,
        total_photo_count: Number,
        has_kudoed: Boolean
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

activityScheme.index({ id: 1 })

// Map account to activity
activityScheme.virtual('user', {
    ref: 'Account',
    foreignField: 'id',
    localField: 'athlete.id',
    justOne: true
})

activityScheme.pre(/^find/, function(next) {
    this.populate({
        path: 'user'
    })
    next()
})

const Activity = mongoose.model('Activity', activityScheme)

module.exports = Activity