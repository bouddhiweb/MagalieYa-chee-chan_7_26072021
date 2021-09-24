const router = require('express').Router();
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/update', userCtrl.update);
router.get('/userlist', userCtrl.userlist);
module.exports = router;