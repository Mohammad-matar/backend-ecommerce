const Category = require("../Models/categoryModel")

// Get all transaction 
exports.getAllCategories = async (req, res) => {
    try {
        const category = await Category.find();
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).send({ message: true, data: category });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
//Add a new Category
exports.addCategory = async (req, res) => {
    try {
        const {
            type,
            description,
        } = req.body;

        const addNewCategory = await Category.create({
            type,
            description,
        });

        if (!addNewCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewCategory });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

// Edit Category

exports.editOneCategory = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        const updateCategory = await Category.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateCategory) {
            return res.status(404).json({ message: "Category is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: updateCategory });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
    //Delete One Category

exports.deleteCategory = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteOneCategory = await Category.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteOneCategory) {
            return res.status(404).json({ message: "Category Not Found" });
        }
        res.status(200).send({ success: true, message: "Category Deleted", data: deleteOneCategory });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
}