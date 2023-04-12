const Review = require("../Models/reviewModel")

// Get all varient 
exports.getAllReview = async (req, res) => {
    try {
        const review = await Review.find();
        if (!review) {
            return res.status(404).json({ message: "varient not found" });
        }
        res.status(200).send({ message: true, data: review });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// add product
exports.addReview= async (req, res) => {
    try {
        const {
            rating,
            review,
            product_id,
            user_id,

        } = req.body;

        const addNewReview = await Review.create({
            rating,
            review,
            product_id,
            user_id,
        });

        if (!addNewReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewReview });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};
// Edit Review
exports.editOneVReview = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        const updateReview = await Review.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateReview) {
            return res.status(404).json({ message: "Review is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: body });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}
//Delete One Review
exports.deleteReview = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteOneReview= await Review.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteOneReview) {
            return res.status(404).json({ message: "Review Not Found" });
        }
        res.status(200).send({ success: true, message: "Review Deleted", data: deleteOneReview });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}