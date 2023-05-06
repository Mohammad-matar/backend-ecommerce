const router = require("express").Router();
const controller = require("../Controllers/orderController");
const userController = require("../Controllers/userController")

router.get("/", userController.protect, controller.getAllOrders);
router.get("/", userController.protect, controller.getOrderHistoryByUserId);
router.post("/", userController.protect, controller.addOrder);
router.put("/:id", userController.protect, controller.editOneOrder);
router.delete("/:id", userController.protect, controller.deleteOrder);

module.exports = router;
