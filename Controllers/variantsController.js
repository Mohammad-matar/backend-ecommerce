const Varients = require("../Models/variantsModel")

// Get all varient 
exports.getAllVarients = async (req, res) => {
    try {
        const varient = await Varients.find();
        if (!varient) {
            return res.status(404).json({ message: "varient not found" });
        }
        res.status(200).send({ message: true, data: varient });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
//Add a new varient
exports.addVarient = async (req, res) => {
    try {
        const {
            color,
            size,
            stock,
            image
        } = req.body;

        const addNewVarient = await Varients.create({
            color,
            size,
            stock,
            image
        });

        if (!addNewVarient) {
            return res.status(404).json({ message: "Varients not found" });
        }
        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewVarient });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};
// Edit Varient
exports.editOneVarient = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        const updateVarient = await Varients.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateVarient) {
            return res.status(404).json({ message: "Varients is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: body });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}
//Delete One Varient
exports.deleteVarient = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteOneVarient= await Varients.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteOneVarient) {
            return res.status(404).json({ message: "Varient Not Found" });
        }
        res.status(200).send({ success: true, message: "Varient Deleted", data: deleteOneVarient });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
