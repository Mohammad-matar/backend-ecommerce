
const router = require("express").Router();
const controller = require("../Controllers/productController");
const userController = require("../Controllers/userController")

router.get("/", controller.getAllProduct);
router.get("/:id", controller.getProductById);
router.get("/category/:category_id", controller.getProductsByCategoryId);

router.post("/",  userController.protect,controller.addProduct);
router.put("/:id", userController.protect,controller.editOneProduct);
router.delete("/:id", userController.protect,controller.deleteProduct);

module.exports = router;