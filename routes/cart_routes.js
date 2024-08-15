


const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const logRequest = require('../middlewares/logRequest');  // Import the logging middleware
const { verifyUser } = require('../middlewares/auth');  // Assuming user actions are restricted to authenticated users

// Save Encrypted Cart Data
router.post('/saveCart', verifyUser, logRequest, cartController.saveCart);  // Log cart saving

// Retrieve and Decrypt Cart Data
router.get('/getCart/:userId', verifyUser, logRequest, cartController.getCart);  // Log cart retrieval

// Delete specific item from cart
router.delete('/deleteItem/:userId/:productId', verifyUser, logRequest, cartController.deleteCartItem);  // Log cart item deletion

// Clear the entire cart
router.delete('/clearCart/:userId', verifyUser, logRequest, cartController.clearCart);  // Log cart clearing

module.exports = router;
