const router = require('express').Router();
const postCtrl = require('../controllers/posts');

router.post('/create', postCtrl.create);
router.post('/delete', postCtrl.delete);
router.get('/list', postCtrl.list);
module.exports = router;