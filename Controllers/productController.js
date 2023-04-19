const mongoose = require('mongoose');
const Product = require("../Models/productModel")

// Get getAllProduct 
exports.getAllProduct = async (req, res) => {
    try {
        const product = await Product.find();
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        res.status(200).send({ message: "get all products successfully", success: true, data: product });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id,"id")
        const product = await Product.aggregate([
            {
                $match: { _id:new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "reviews",
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "_id",
                                foreignField: "user_id",
                                as: "userInfo",
                            }
                        }
                    ]

                },

            },
        ])
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        console.log(product[0].reviews, "product")
        res.status(200).json({
            success: true,
            data: product,
            message: 'Successfully product',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getProductsByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.category_id;
        const products = await Product.find({ category_id: categoryId }).populate('category_id');
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//get product by id reviews

// add product
exports.addProduct = async (req, res) => {
    try {
        if (req.user.role === "user") {
            return res.status(401).json({ message: "manna sha8ltak" });
        }
        const addNewProduct = await Product.create(
            req.body
        );

        if (!addNewProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

// Edit Product
exports.editOneProduct = async (req, res) => {
    try {
        if (req.user.role === "user") {
            return res.status(401).json({ message: "manna sha8ltak" });
        }
        let { id } = req.params;
        let body = req.body;
        const updateProduct = await Product.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateProduct) {
            return res.status(404).json({ message: "Product is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: body });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//Delete One Product
exports.deleteProduct = async (req, res) => {
    try {
        if (req.user.role === "user") {
            return res.status(401).json({ message: "manna sha8ltak" });
        }
        let { id } = req.params;
        const deleteOneProduct = await Product.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteOneProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).send({ success: true, message: "Product Deleted", data: deleteOneProduct });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
