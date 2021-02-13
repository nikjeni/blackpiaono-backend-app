const jwt = require('jsonwebtoken');
const config = require('../config.json');
module.exports.auth = (req, res, next) => {
    try {
        var decoded = jwt.verify(req.headers.authorization, config.mysecretkey);
        next();
    } catch (err) {
        return res.send({ 'message': 'invalid secret key', status: 400 });
    }
}