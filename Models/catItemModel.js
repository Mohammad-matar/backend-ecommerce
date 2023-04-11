const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({

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
    }

},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Reviews", reviewSchema);