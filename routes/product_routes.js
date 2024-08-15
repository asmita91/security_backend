



const express = require('express');
const productController = require('../controllers/product_controller');
const { verifyUser } = require('../middlewares/auth');
const logRequest = require('../middlewares/logRequest');  // Import the logging middleware
const router = express.Router();

// Get products by admin + registered users + guests
router.route('/')
    .post((req, res, next) => res.status(405).json({ error: "POST method is not allowed" }))
    .delete((req, res, next) => res.status(405).json({ error: "DELETE method is not allowed" }))
    .put((req, res, next) => res.status(405).json({ error: "PUT method is not allowed" }))
    .get(logRequest, productController.getAllProducts);  // Log product listing

// Get a single product by admin + registered users + guests
router.route('/:product_id')
    .post((req, res, next) => res.status(405).json({ error: "POST method is not allowed" }))
    .delete((req, res, next) => res.status(405).json({ error: "DELETE method is not allowed" }))
    .put((req, res, next) => res.status(405).json({ error: "PUT method is not allowed" }))
    .get(logRequest, productController.getSingleProduct);  // Log single product access

// Reviews for all users
router.route('/reviews/:product_id')
    .delete((req, res, next) => res.status(405).json({ error: "DELETE method is not allowed" }))
    .put((req, res, next) => res.status(405).json({ error: "PUT method is not allowed" }))
    .get(logRequest, productController.getAllReviews)  // Log review listing
    .post(verifyUser, logRequest, productController.addReview);  // Log review addition by a registered user

module.exports = router;
