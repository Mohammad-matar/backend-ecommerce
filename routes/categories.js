
const router = require("express").Router();
const controller = require("../Controllers/categoryController");
const userController = require("../Controllers/userController")

router.get("/",controller.getAllCategories);
router.get("/:id", controller.getCategorieById);
router.post("/",userController.protect,  controller.addCategory);
router.put("/:id", userController.protect, controller.editOneCategory);
router.delete("/:id", userController.protect, controller.deleteCategory)
module.exports = router;
