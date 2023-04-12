const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({

    rating: {
        type: String,
        required: [true, "Please enter the rating"],
    },
    review: {
        type: String,
        required: [true, "Please enter the review"],
        trim: true
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
reviewSchema.pre(["find", "findOne"], function () {
    this.populate(["product_id"]);
    this.populate(["user_id"]);

  });


module.exports = mongoose.model("Reviews", reviewSchema);