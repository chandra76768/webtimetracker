const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    domain: { type: String, required: true },
    usage: { type: Number, required: true }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
