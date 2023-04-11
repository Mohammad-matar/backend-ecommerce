const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            minLength: 3,
            trim: true
        },
        description: {
            type: String,
            required: [true, "Please enter the description"],
            trim: true
        },
        variants_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variants'
        }],
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, "Please choose a category"]
        },
        price: {
            type: String,
            required: [true, "Please enter the price"]
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Product", productSchema);
