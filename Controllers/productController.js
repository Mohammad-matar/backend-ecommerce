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
//add product
// exports.addCategory = async (req, res) => {
//     try {
//         const {
//             type,
//             description,
//         } = req.body;

//         const addNewCategory = await Category.create({
//             type,
//             description,
//         });

//         if (!addNewCategory) {
//             return res.status(404).json({ message: "Category not found" });
//         }
//         res
//             .status(200)
//             .send({ success: true, message: "Add Successfully", data: addNewCategory });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//         console.log(err);
//     }
// };
