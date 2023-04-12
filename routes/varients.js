const router = require("express").Router();
const controller = require("../Controllers/variantsController");

router.get("/", controller.getAllVarients);
router.post("/", controller.addVarient);
router.put("/:id", controller.editOneVarient);
router.delete("/:id", controller.deleteVarient)

module.exports = router;
