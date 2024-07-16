const { encrypt, decrypt } = require('../utilities/encryption');
const Cart = require('../models/Cart');
const Product=require('../models/Product')
const mongoose = require('mongoose');

// // Save Encrypted Cart Data
// exports.saveCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;
//   try {
//     // Fetch the current cart or create a new one
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId });
//     }

//     // Decrypt the current cart data to modify it
//     const currentCartData = cart.encryptedCartData ? JSON.parse(decrypt(cart.encryptedCartData)) : [];

//     // Check if the product is already in the cart
//     const existingProductIndex = currentCartData.findIndex(item => item.productId.toString() === productId);

//     if (existingProductIndex >= 0) {
//       // If the product already exists in the cart, update the quantity
//       currentCartData[existingProductIndex].quantity += quantity;
//     } else {
//       // Otherwise, add the new product to the cart
//       currentCartData.push({ productId: mongoose.Types.ObjectId(productId), quantity });
//     }

//     // Encrypt the updated cart data and save it
//     cart.encryptedCartData = encrypt(JSON.stringify(currentCartData));
//     await cart.save();

//     res.status(200).json({ message: 'Cart updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error saving cart data' });
//   }
// };


exports.saveCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      // Fetch the current cart or create a new one
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId });
      }
  
      // Decrypt the current cart data to modify it
      const currentCartData = cart.encryptedCartData ? JSON.parse(decrypt(cart.encryptedCartData)) : [];
  
      // Check if the product is already in the cart
      const existingProductIndex = currentCartData.findIndex(item => item.productId.toString() === productId);
  
      if (existingProductIndex >= 0) {
        // If the product already exists in the cart, update the quantity
        currentCartData[existingProductIndex].quantity += quantity;
      } else {
        // Otherwise, add the new product to the cart
        currentCartData.push({ productId: new mongoose.Types.ObjectId(productId), quantity });
    }
  
      // Encrypt the updated cart data and save it
      cart.encryptedCartData = encrypt(JSON.stringify(currentCartData));
      await cart.save();
  
      res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
      console.error("Error saving cart data:", error);
      res.status(500).json({ error: 'Error saving cart data' });
    }
  };
  
exports.getCart = async (req, res) => {
    const { userId } = req.params;
    try {
      const cartRecord = await Cart.findOne({ userId });
      if (!cartRecord) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      const decryptedCart = JSON.parse(decrypt(cartRecord.encryptedCartData));
  
      // Populate product details based on productId references
      const populatedCart = await Promise.all(
        decryptedCart.map(async (item) => {
          const product = await Product.findById(item.productId).lean();
          return {
            product: product,
            quantity: item.quantity,
          };
        })
      );
  
      res.status(200).json({ cart: populatedCart });
    } catch (error) {
        console.error('Error retrieving cart data:', error);
        res.status(500).json({ error: 'Error retrieving cart data' });
    }
  };
  

  exports.deleteCartItem = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        // Fetch the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Decrypt the cart data
        const decryptedCartData = JSON.parse(decrypt(cart.encryptedCartData));

        // Filter out the item that needs to be deleted
        const updatedCartData = decryptedCartData.filter(item => item.productId.toString() !== productId);

        if (updatedCartData.length === decryptedCartData.length) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        // Re-encrypt the updated cart data
        cart.encryptedCartData = encrypt(JSON.stringify(updatedCartData));

        // Save the updated cart back to the database
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart', cart: updatedCartData });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Error removing item from cart' });
    }
};


exports.purchaseProduct = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Fetch the cart for the user
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Decrypt the cart data
      const decryptedCart = JSON.parse(decrypt(cart.encryptedCartData));
  
      // Map the decrypted cart data to match the purchase schema
      const purchaseItems = await Promise.all(decryptedCart.map(async item => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        return {
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      }));
  
      // Calculate the total price
      const totalPrice = purchaseItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      // Create a new purchase record
      const newPurchase = new Purchase({
        user: userId,
        items: purchaseItems,
        totalPrice: totalPrice,
        payment: 'success',
      });
  
      await newPurchase.save();
  
      // Clear the cart after purchase
      cart.encryptedCartData = encrypt(JSON.stringify([]));
      await cart.save();
  
      res.status(200).json({ message: 'Purchase completed successfully' });
    } catch (error) {
      console.error('Error processing purchase:', error);
      res.status(500).json({ error: 'Failed to complete the purchase' });
    }
  };
  

  exports.clearCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      cart.encryptedCartData = encrypt(JSON.stringify([]));
      await cart.save();
  
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'Failed to clear the cart' });
    }
  };
  