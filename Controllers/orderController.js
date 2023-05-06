const Order = require("../Models/orderModel")

// Get all cart
exports.getAllOrders = async (req, res) => {
    try {
        if (req.user.role === 'user') {
            return res.status(401).json({ message: "not autorized" })
        }
        const order = await Order.find();
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        res.status(200).send({ message: true, data: order });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

exports.getOrderHistoryByUserId = async (req, res) => {
    try {
        const order = await Order.find({ user_id: req.user._id });
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        res.status(200).send({ message: true, data: order });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// add order
exports.addOrder = async (req, res) => {
    try {
        if (req.user.role !== "user") {
            return res.status(401).json({ message: "not authorized" })
        }
        const addNewOrder = await Order.create({
            user_id: req.user._id, ...req.body
        });

        if (!addNewOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

// Edit cart
exports.editOneOrder = async (req, res) => {
    try {
        let { id } = req.params;
        if (req.user.role == user) {
            return res.status(401).json({ message: 'not authorized' })
        }
        let body = req.body;
        const updateOrder = await Order.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateOrder) {
            return res.status(404).json({ message: "Order is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: updateOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//Delete One Cart
exports.deleteOrder = async (req, res) => {
    try {
        if (req.user.role == user) {
            return res.status(401).json({ message: 'not authorized' })
        }
        let { id } = req.params;
        const deleteOneOrder = await Order.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteOneOrder) {
            return res.status(404).json({ message: "Order Not Found" });
        }
        res.status(200).send({ success: true, message: "Order Deleted", data: deleteOneOrder });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}