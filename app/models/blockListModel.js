const mongoose = require('mongoose');

const blocklistSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: [true, 'IP address is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Blocklist = mongoose.model('Blocklist', blocklistSchema);

module.exports = Blocklist;