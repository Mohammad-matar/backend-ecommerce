const Category = require("../Models/categoryModel")

// Get all Categorie 
exports.getAllCategories = async (req, res) => {
    try {
        const category = await Category.find();
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).send({ message: "get all categories successfully", success: true, data: category });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// Get by id Categorie 
exports.getCategorieById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'category not found' });
        }
        res.status(200).json({
            success: true,
            data: category,
            message: 'Successfully category',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

//Add a new Category
exports.addCategory = async (req, res) => {
    try {
        if (req.user.role === "user") {
            return res.status(401).json({ message: "manna sha8ltak" });
        }

        const addNewCategory = await Category.create(
            req.body
        )

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
        if (req.user.role === "user") {
            return res.status(401).json({ message: "manna sha8ltak" });
        }
        let { id } = req.params;
        const category_Id = await Category.findById(id);

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
        if (!category_Id) {
            res.status(400).send({ success: false, message: "id not found" });
        }
        else {
            res.status(200).send({ success: true, message: "Edit Successfully", data: updateCategory });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//Delete One Category
exports.deleteCategory = async (req, res) => {
    try {
        if (req.user.role === "user") {
            return res.status(401).json({ message: "manna sha8ltak" });
        }
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