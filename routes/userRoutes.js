const router = require("express").Router();
const controller = require("../Controllers/userController");
const userController = require("../Controllers/userController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/", userController.protect, controller.getUsers);
router.put("/:id", userController.protect, controller.editUser);
router.delete("/:id", userController.protect, controller.deleteUser);

module.exports = router;