const express = require("express");
const router = express.Router();
const {
  createCategory,
  findAllCategory,
  findOneCategory,
  removeCategory,
  updateCategory,
} = require("../controller/categories.controller");
const { isLogin, isAdmin } = require("../middleware/auth.middleware");

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.get("/", findAllCategory);
router.get("/:id", findOneCategory);
router.delete("/:id", removeCategory);
module.exports = router;
