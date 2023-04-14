const router = require("express").Router();
const controller = require("../Controllers/reviewController");

router.get("/", controller.getAllReview);
router.get("/:id", controller.getReviewyId);
router.post("/", controller.addReview);
router.put("/:id", controller.editOneVReview);
router.delete("/:id", controller.deleteReview)

module.exports = router;
