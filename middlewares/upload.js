
// middleware for handling multipart/form-data like images, files 

// const saveDestinationPath = process.env.NODE_ENV === 'test' ? 'public/test_uploads' : 'public/uploads';
const multer = require('multer');

const uuid = require('uuid').v4;
const path = require('path');

const storageForProduct = multer.diskStorage({
    // set destination
    destination: (req, file, cb) => {
        // cb(null, 'public/uploads');
        cb(null, 'public/product');
    },
    filename: (req, file, cb) => {
        // get extension of the files
        const fileExtension = path.extname(file.originalname.toLowerCase());

        // set the filename by taking fieldname, unique id (from uuid) and its extension
        cb(null, `${file.fieldname}${uuid()}${fileExtension}`);
    }
});

const storageForProfile = multer.diskStorage({
    // set destination
    destination: (req, file, cb) => {
        // cb(null, 'public/uploads');
        cb(null, 'public/profile');
    },
    filename: (req, file, cb) => {
        // get extension of the files
        const fileExtension = path.extname(file.originalname.toLowerCase());

        // set the filename by taking fieldname, unique id (from uuid) and its extension
        cb(null, `${file.fieldname}${uuid()}${fileExtension}`);
    }
});

const fileFilter = (req, file, cb) => {
    // get file extension
    const fileExtension = path.extname(file.originalname.toLowerCase());

    // supports only png, jpeg and png
    if (!fileExtension.match(/png|jpeg|jpg/)) {
        return cb(new Error('only jpg, jpeg and png files are supported.'), false);
    }
    cb(null, true);
}; 


const uploadForProduct = multer({
    storage: storageForProduct,
    fileFilter: fileFilter,
    limits: { fieldSize: 3 * 1024 * 1024 }  // Note: supports only less than 3 MB
});


const uploadForProfile = multer({
    storage: storageForProfile,
    fileFilter: fileFilter,
    limits: { fieldSize: 3 * 1024 * 1024 }  // Note: supports only less than 3 MB
});

module.exports = { uploadForProduct, uploadForProfile };