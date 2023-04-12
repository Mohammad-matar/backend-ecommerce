
const router = require("express").Router();
const controller = require("../Controllers/cartController");
// const auth = require('../controllers/userController');

router.get("/", controller.getAllCart);
router.post("/", controller.addCart);
router.put("/:id", controller.editOneCart);
router.delete("/:id", controller.deleteCart);
module.exports = router;
