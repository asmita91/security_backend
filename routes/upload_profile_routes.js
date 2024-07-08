
const express = require('express');
const { uploadForProfile } = require('../middlewares/upload');
const { User } = require('../models/User');
const { uploadForProduct } = require('../middlewares/upload');
const Product = require('../models/Product');
const router = express.Router();


// upload image for profile
// Note: upload a single photo for now, 'photo' is the fieldname
router.post('/', uploadForProfile.single('photo'), (req, res) => {

    // Insert filename in the 'picture' attribute of the logged in user
    User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { picture: `${req.file.filename}` } },
        { new: true }
    )
        .then(user => {
            // if (!user) return res.status(404).json({ error: 'User is not found' });

            res.json(req.file); // Send file properties
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// upload image for product
router.post('/:product_id', uploadForProduct.single('photo'), (req, res) => {

    // Insert filename in the 'picture' attribute of the product
    Product.findByIdAndUpdate(
        req.params.product_id,
        { $set: { picture: `${req.file.filename}` } },
        { new: true }
    )
        .then(product => {
            if (!product) return res.status(404).json({ error: 'Product id is not found' });

            res.json(req.file); // Send file properties
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;