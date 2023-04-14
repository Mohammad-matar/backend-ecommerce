const router = require("express").Router();
const controller = require("../Controllers/variantsController");
const userController = require("../Controllers/userController")

router.get("/", controller.getAllVarients);
router.get("/:id", controller.getVarientsById);
router.post("/", userController.protect, controller.addVarient);
router.put("/:id", userController.protect, controller.editOneVarient);
router.delete("/:id", userController.protect, controller.deleteVarient)

module.exports = router;
