const mongoose = require('mongoose');

const variantsSchema = new mongoose.Schema(
    {
        color: {
            type: String,
            required: [true, "Please choose your color"],
            minLength: 3,
            trim: true
        },
        size: {
            type: String,
            required: [true, "Please choose your Size"]
        },
        stock: {
            type: Number,
        },
        image: [String],
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    },
    {
        timestamps: true
    }
);

variantsSchema.pre(["find", "findOne"], function () {
    this.populate(["product_id"]);
});

module.exports = mongoose.model("Variants", variantsSchema);