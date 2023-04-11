const mongoose = require('mongoose');
const cartItemSchema = require("./catItemModel")
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({



    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema]
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Cart", cartSchema);