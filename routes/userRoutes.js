const router = require("express").Router();
const controller = require("../Controllers/userController");
const userController = require("../Controllers/userController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.put("/", userController.protect, controller.editUser);
router.get("/", userController.protect, controller.getUsers);
router.get("/user-info", userController.protect, controller.getUserInfo);

router.delete("/:id", userController.protect, controller.deleteUser);

module.exports = router;