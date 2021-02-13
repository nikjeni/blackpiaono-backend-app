const { User } = require('../models/users-models');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

// Register User
module.exports.register = async (req, res, next) => {
    console.log('adad');
    try {
        brcypt.genSalt(10, function (err, salt) {
            brcypt.hash(req.body.password, salt, async function (err, hash) {
                req.body.password = hash;
                var user = new User(req.body);
                await user.save();
                return res.send({ 'message': 'User registered successfully', status: 200 });
            });
        });
    } catch (err) {
        return res.send({ 'status': 400, 'message': 'User creation failed' });
    }
}

// Login User
module.exports.login = async (req, res, next) => {
    try {
        var user = await User.find({ email: req.body.email }).lean();
        console.log(user);
        if (user) {
            brcypt.compare(req.body.password, user[0].password, function (err, result) {
                if (result) {
                    var token = jwt.sign(req.body, config.mysecretkey, { expiresIn: '1h' });
                    return res.send({ 'message': 'Successfully Authenticated', token: token, status: 200 });
                } else {
                    return res.send({ 'message': 'Invalid user', status: 400 });
                }
            })
        } else {
            return res.send({ 'message': 'Invalid credentials', status: 400 })
        }

    } catch (err) {
        return res.send({ 'message': 'Server error', status: 501 });
    }
}

//Delete user
module.exports.deleteUser = async (req, res, next) => {
    console.log(req);
    try {
        await User.deleteOne({ _id: req.query.userId });
        return res.send({ 'message': 'User deleted successfully', status: 200 });
    } catch (err) {
        return res.send({ 'message': 'Server error', status: 501 });
    }
}

//Update User
module.exports.updateUser = async (req, res, next) => {
    try {
        await User.updateOne({ _id: req.body.userId }, {
            $set: {
                name: req.body.name,
                status: req.body.status
            }
        })
        return res.send({ 'message': 'User details updated successfully', status: 200 });
    } catch (err) {
        return res.send({ 'message': 'Failed to update', status: 400 });
    }
}