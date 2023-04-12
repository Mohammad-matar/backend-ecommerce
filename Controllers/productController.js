const Product = require("../Models/productModel")

// Get getAllProduct 
exports.getAllProduct = async (req, res) => {
    try {
        const product = await Product.find();
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        res.status(200).send({ message: true, data: product });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
// add product
exports.addProduct= async (req, res) => {
    try {
        const {
            name,
            description,
            variants_id,
            category_id,
            price

        } = req.body;

        const addNewProduct = await Product.create({
            name,
            description,
            variants_id,
            category_id,
            price
        });

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
