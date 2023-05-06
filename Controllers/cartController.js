const Cart = require("../Models/cartModel")

// Get all cart
exports.getAllCart = async (req, res) => {
    try {
        if (req.user.role === 'user') {
            return res.status(401).json({ message: "not authorized" })
        }
        const cart = await Cart.find();
        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        }
        res.status(200).send({ message: true, data: cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
//get cart BY USER id
exports.getCartByUserId = async (req, res) => {
    try {
        if (req.user.role === 'user') {
            return res.status(401).json({ message: "not authorized" })
        }
        const cart = await Cart.aggregate([{
            $match: { user_id: req.user._id }

        },
        {
            $lookup: {
                from: "cartItems",
                localField: "_id",
                foreignField: "cart_id",
                as: "cartItems"
            }
        }
        ]);
        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        }
        res.status(200).send({ message: true, data: cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// add cart
exports.addCart = async (req, res) => {
    try {
        const {
            user_id,
            items
        } = req.body;

        const addNewCart = await Cart.create({
            user_id,
            items
        });

        if (!addNewCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewCart });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};


// Edit cart
exports.editOneCart = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        const updateCart = await Cart.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateCart) {
            return res.status(404).json({ message: "Cart is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: updateCart });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//Delete One Cart
exports.deleteCart = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteOneCart = await Cart.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteOneCart) {
            return res.status(404).json({ message: "Cart Not Found" });
        }
        res.status(200).send({ success: true, message: "Cart Deleted", data: deleteOneCart });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}