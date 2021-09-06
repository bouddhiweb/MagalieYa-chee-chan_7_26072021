const multerConfig = require('multer');

const MIME_TYPES = {
    'image/gif': 'gif',
};

const storage = multerConfig.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(' ').join('_');
        console.log(name);
        name = name.replace(/^(.*)\..*$/, '$1');
        console.log(name);
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

module.exports = multerConfig({ storage: storage }).single('image');