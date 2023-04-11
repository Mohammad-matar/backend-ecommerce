
const router = require("express").Router();
const controller = require("../Controllers/categoryController");
// const auth = require('../controllers/userController');

router.get("/", controller.getAllCategories);
router.post("/", controller.addCategory);
router.put("/:id", controller.editOneCategory);
router.delete("/:id", controller.deleteCategory)
module.exports = router;
