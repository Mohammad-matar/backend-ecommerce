
const router = require("express").Router();
const controller = require("../Controllers/cartItemController");
const userController = require("../Controllers/userController")

router.get("/",userController.protect, controller.getAllCartItem);
router.get("/:id",userController.protect, controller.getCartItemById);
router.post("/", userController.protect, controller.addCartItem);
router.put("/:id", userController.protect, controller.editOneCartItem);
router.delete("/:id", userController.protect, controller.deleteCartItem)
module.exports = router;
