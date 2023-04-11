const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({

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
    variants_id: [variantSchema],

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


module.exports = mongoose.model("Products", productSchema);