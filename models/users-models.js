const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String
    },
    createadAt: {
        type: Date,
        default: Date.now
    }
});

module.exports.User = mongoose.model('User', userSchema);

