const mongoose = require('mongoose');

const pagesSchema = mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    keywords: {
        type: String
    },
    createadAt: {
        type: Date,
        default: Date.now
    },
    createdBy: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
});

module.exports.Page = mongoose.model('Page', pagesSchema);

