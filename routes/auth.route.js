const {
  signup,
  login,
  loginGoogle,
  confirmCode,
} = require("../controller/auth.controller.js");
const express = require("express");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/loginGoogle", loginGoogle);
router.post("/confirmCode/:token", confirmCode);

module.exports = router;
