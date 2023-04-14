
const router = require("express").Router();
const controller = require("../Controllers/cartController");
const userController = require("../Controllers/userController")
// const auth = require('../controllers/userController');

router.get("/", userController.protect, controller.getAllCart);
router.post("/", userController.protect, controller.addCart);
router.put("/:id", userController.protect, controller.editOneCart);
router.delete("/:id", userController.protect, controller.deleteCart);
module.exports = router;
