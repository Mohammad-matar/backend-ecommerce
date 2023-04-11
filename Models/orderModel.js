const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },

    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true },
    deliveredAt: { type: Date }
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Order", orderSchema);