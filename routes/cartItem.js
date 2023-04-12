
const router = require("express").Router();
const controller = require("../Controllers/cartItemController");
// const auth = require('../controllers/userController');

router.get("/", controller.getAllCartItem);
router.post("/", controller.addCartItem);
router.put("/:id", controller.editOneCartItem);
router.delete("/:id", controller.deleteCartItem)
module.exports = router;
