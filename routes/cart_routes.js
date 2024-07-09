const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Save Encrypted Cart Data
router.post('/saveCart', cartController.saveCart);

// Retrieve and Decrypt Cart Data
router.get('/getCart/:userId', cartController.getCart);

router.delete('/deleteItem/:userId/:productId', cartController.deleteCartItem);
router.delete('/clearCart/:userId', cartController.clearCart);


module.exports = router;
