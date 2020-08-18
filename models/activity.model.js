const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema(
    {
        membername: {type: String, required: true},
        description: {type: String, required: true},
        duration: {type: Number, required: true},
        date: {type: Date, required: true},
    },
    {
        timestamps: true,
    },
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;