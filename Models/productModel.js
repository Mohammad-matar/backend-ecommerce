const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter the title"],
            minLength: 3,
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Please enter the price"],
            trim: true
        },
        description: {
            type: String,
            minLength: 3,
            trim: true
        },
        image: {
            type: String,
            minLength: 3,
            trim: true
        },
        quantity: {
            type: Number,
            trim: true,
            required: [true, "Please enter the quantity"],

        },
        color: {
            type: String,
            minLength: 3,
            trim: true
        },
        size: {
            type: String,
            minLength: 3,
            trim: true
        },
        stock: {
            type: Number,
            trim: true
        },
        variants: {
            type: String,
            minLength: 3,
            trim: true
        },
        Category_id: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    {
        timestamps: true
    }
);
productSchema.pre(["find", "findOne"], function () {
    this.populate(["Category"]);
});


module.exports = mongoose.model("product", productSchema);