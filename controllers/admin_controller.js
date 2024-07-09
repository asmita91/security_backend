const Product = require("../models/Product");

// add product only by admin
const addProduct = (req, res, next) => {
    Product.find()
        .then(() => {
            Product.create({ ...req.body })
                .then(addedProduct => {
                    res.status(201).json(addedProduct);
                })
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch((err => res.status(400).json({ error: err.message })));
};


// update product
const updateProduct = (req, res, next) => {
    const productId = req.params.product_id;
    Product.findByIdAndUpdate(productId, { $set: req.body, }, { new: true })
        .then(updatedProduct => {
            res.status(200).json(updatedProduct);
        })
        .catch((err => res.status(400).json({ error: err.message })));
};

// delete product

const deleteSingleProduct = (req, res, next) => {
    const productId = req.params.product_id;
    Product.findByIdAndDelete(productId)
        .then(() => {
            res.status(204).end();
        })
        .catch((err => res.status(400).json({ error: err.message })));

};

// unlock the account of registered users
const userAccountUnlock = (req, res, next) => {
    const userId = req.params.user_id;
    User.findByIdAndUpdate(userId, { $set: { status: "active" } }, { new: true })
        .then(updatedUserDetail => {
            res.status(200).json(updatedUserDetail);
        })
        .catch((err => res.status(400).json({ error: err.message })));

};



module.exports = {
    addProduct,
    updateProduct,
    deleteSingleProduct,
    userAccountUnlock,
}