const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variantsSchema = new mongoose.Schema({

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
    image: []

},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Variants", variantsSchema);