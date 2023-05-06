const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: [true, "Choose your quantity"]
        },
        variants_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variants',
            required: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "Please choose a product"]
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cart_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
            required: true
        }
    },
    {
        timestamps: true
    }
);

cartItemSchema.pre(["find", "findOne"], function () {
    this.populate(["product_id"]);
    this.populate(["user_id"]);
    this.populate(["variants_id"]);
    this.populate(['cart_id'])
});

module.exports = mongoose.model("CartItem", cartItemSchema);