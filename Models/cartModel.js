const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem',
        }]
    },
    {
        timestamps: true
    }
);
cartSchema.pre(["find", "findOne"], function () {
    this.populate(["user_id"]);
    this.populate(["items"]);

});
module.exports = mongoose.model("Cart", cartSchema);