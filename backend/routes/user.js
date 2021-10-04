const router = require('express').Router();
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/delete', userCtrl.delete);
router.get('/userlist', userCtrl.userlist);
module.exports = router;