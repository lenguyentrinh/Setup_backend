const express = require("express");
const router = express.Router();
const {
  createArea,
  findAllArea,
  findOneArea,
  removeArea,
  updateArea,
} = require("../controller/areas.controller");
const { isLogin, isAdmin } = require("../middleware/auth.middleware");

router.post("/", isLogin, isAdmin, createArea);
router.put("/:id", isLogin, isAdmin, updateArea);
router.get("/", findAllArea);
router.get("/:id", findOneArea);
router.delete("/:id", isLogin, isAdmin, removeArea);
module.exports = router;
