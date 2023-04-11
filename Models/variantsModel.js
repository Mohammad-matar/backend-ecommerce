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
        image: [String]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Variants", variantsSchema);