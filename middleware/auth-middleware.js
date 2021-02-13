const jwt = require('jsonwebtoken');
const config = require('../config.json');
module.exports.auth = (req, res, next) => {
    try {
        var decoded = jwt.verify(req.headers.authorization, config.mysecretkey);
        console.log("decoded", decoded);
        if (decoded.email == req.body.email) {
            next();
        } else {
            return res.send({ 'message': 'Invalid user', status: 400 });
        }
    } catch (err) {
        return res.send({ 'message': 'invalid secret key', status: 400 });
    }
}