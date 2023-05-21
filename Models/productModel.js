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
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, "Please choose a category"]
        },
        productImg: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: [true, "Please enter the price"]
        }
    },
    {
        timestamps: true
    }
);

productSchema.pre(["find", "findOne"], function () {
    this.populate(["category_id"]);
});

module.exports = mongoose.model("Product", productSchema);
