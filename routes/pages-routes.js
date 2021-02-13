const router = require('express').Router();
const { auth } = require('../middleware/auth-middleware');
const pageController = require('../controller/pages-controller');

router.post('/createPage', auth, pageController.createPage);
router.post('/updatePage', auth, pageController.updatePage);
router.delete('/deletePage', auth, pageController.deletePage);
router.get('/getPages', auth, pageController.getPages);

module.exports.pageRoutes = router;