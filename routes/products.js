
const router = require("express").Router();
const controller = require("../Controllers/productController");

router.get("/", controller.getAllProduct);
// router.post("/", controller.addCategory);
// router.put("/:id", controller.editOneCategory);
// router.delete("/:id", controller.deleteCategory);

module.exports = router;