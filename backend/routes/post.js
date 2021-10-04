const router = require('express').Router();
const multer = require('multer');
const postCtrl = require('../controllers/posts');
const upload = multer({storage : multer.diskStorage({
  destination: (req, file, callback) => {
   callback(null, 'image');
  },
  filename: (req, file, callback) => {
   const MIME_TYPES = {'image/gif': 'gif',};
   let name = file.originalname.split(' ').join('_');
   name = name.replace(/^(.*)\..*$/, '$1');
   const extension =  MIME_TYPES[file.mimetype];
   callback(null, name + '_' + Date.now() + '.' + extension);
  }
 })});

router.post('/create', upload.single('file'), postCtrl.create);
router.post('/delete', postCtrl.delete);
router.get('/list', postCtrl.list);
module.exports = router;