const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true
    }
);

cartSchema.pre(["find", "findOne"], function () {
    this.populate(["user_id"]);
});

module.exports = mongoose.model("Cart", cartSchema);