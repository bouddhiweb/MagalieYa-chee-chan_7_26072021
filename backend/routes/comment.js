const router = require('express').Router();
const commentCtrl = require('../controllers/comments');

router.post('/create', commentCtrl.create);
router.post('/delete', commentCtrl.delete);
router.post('/list', commentCtrl.list);
module.exports = router;