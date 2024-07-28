const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    userEmail: { type: String, required: true },
    productId: { type: String, required: true },
});

const Cart = mongoose.model('Cart', cartSchema,'Cart');

module.exports = Cart;