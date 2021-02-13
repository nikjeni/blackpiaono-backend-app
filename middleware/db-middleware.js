const mongoose = require('mongoose');

module.exports.db = (req, res, next) => {
    mongoose.connect('mongodb://localhost:27017/blackpianodb', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to database');
            next();
        })
        .catch((err) => {
            console.log(`Failed to connect : ${err}`);
        })
}