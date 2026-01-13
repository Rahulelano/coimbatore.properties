const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: false // Optional, as some properties might be Admin owned
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Resolved'],
        default: 'Pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
