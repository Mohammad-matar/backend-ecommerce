
const router = require("express").Router();
const controller = require("../Controllers/productController");

router.get("/", controller.getAllProduct);
router.post("/", controller.addProduct);
router.put("/:id", controller.editOneProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;