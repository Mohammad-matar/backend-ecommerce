const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cartItems_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CartItems',
                required: true
            }
        ],

        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        },
        paymentMethod: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
        isDelivered: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);