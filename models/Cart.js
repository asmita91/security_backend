const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },

  encryptedCartData: { type: String, required: true }
});

cartSchema.methods.encryptAndSaveCart = function(cartData) {
  this.encryptedCartData = encrypt(JSON.stringify(cartData));
  return this.save();
};

cartSchema.methods.decryptCart = function() {
  return JSON.parse(decrypt(this.encryptedCartData));
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
