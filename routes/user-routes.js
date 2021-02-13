const router = require('express').Router();
const { auth } = require('../middleware/auth-middleware');
const userController = require('../controller/user-controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/deleteUser', auth, userController.deleteUser);
router.post('/updateUser', auth, userController.updateUser);

module.exports.userRoutes = router;