const mongoose = require('mongoose');
const Product = require("../Models/productModel")
const Variants = require('../Models/variantsModel')

// Get getAllProduct 
exports.getAllProduct = async (req, res) => {
    try {
        const product = await Product.aggregate([
         
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variants",

                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category",

                },
            },
        ])
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

        const product = await Product.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
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
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variants",

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
        res.status(200).json({
            success: true,
            data: products,
            message: 'Successfully product',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// add product
exports.addProduct = async (req, res) => {
    try {
        if (req.user.role === "user") {
            return res.status(401).json({ message: "cannot add a product" });
        }
        const newProduct = await Product.create(req.body)
        if (!newProduct) {
            return res.status(404).json({ message: "Product not added" });
        }
        for (let i = 0; i < req.body.variants.length; i++) {
            const newVariant = await Variants.create({ ...req.body.variants[i], product_id: newProduct._id })
        }
        res
            .status(200)
            .send({ success: true, message: "Added Successfully", data: newProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

// Edit Product
exports.editOneProduct = async (req, res) => {
    try {
        if (req.user.role === "user") {
            return res.status(401).json({ message: "Editing failed" });
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
            return res.status(401).json({ message: "Not authorized" });
        }

        const { id } = req.params;

        const deleteOneProduct = await Product.findByIdAndDelete({ _id: id });

        if (!deleteOneProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        const variants = await Variants.deleteMany({ product_id: id });

        res.status(200).send({
            success: true,
            message: "Product and its variants deleted",
            data: deleteOneProduct,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

