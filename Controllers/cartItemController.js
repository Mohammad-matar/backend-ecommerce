const CartItem = require("../Models/cartItemModel")
const Cart = require('../Models/cartModel')

// Get all cartItem 
exports.getAllCartItem = async (req, res) => {
    try {
        if (req.user.role === "user") {
            return res.status(400).json({ message: 'cannot add a cart item' })
        }
        const cartItem = await CartItem.find();
        if (!cartItem) {
            return res.status(404).json({ message: "cartItem not found" });
        }
        res.status(200).send({ message: true, data: cartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

//Get Cart item By id
exports.getCartItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItem.findById(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'cartItem not found' });
        }
        res.status(200).json({
            success: true,
            data: cartItem,
            message: 'Successfully cartItem',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


// add cartItem
exports.addCartItem = async (req, res) => {
    try {

        const userCart = await Cart.findOne(
            {
                user_id: req.user._id
            }
        )
        const addNewCartItem = await CartItem.create({
            ...req.body, user_id: req.user._id, cart_id: userCart._id
        });

        if (!addNewCartItem) {
            return res.status(404).json({ message: "cartItem not found" });
        }
        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewCartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};


// Edit cartItem
exports.editOneCartItem = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        const updateCartItem = await CartItem.updateOne(
            { _id: id, user_id: req.user._id },
            {
                $set: body,
            },
        );
        if (!updateCartItem) {
            return res.status(404).json({ message: "CartItem is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: updateCartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//Delete One CartItem
exports.deleteCartItem = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteOneCartItem = await CartItem.findByIdAndDelete(
            { _id: id, user_id: req.user._id }
        );
        if (!deleteOneCartItem) {
            return res.status(404).json({ message: "CartItem Not Found" });
        }
        res.status(200).send({ success: true, message: "CartItem Deleted", data: deleteOneCartItem });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}