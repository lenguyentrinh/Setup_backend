const express = require("express");
const router = express.Router();
const {
  forgotSendEmail,
  forgotPassword,
  // changePassword,
} = require("../controller/users.controller");
router.post("/forgotPassword", forgotSendEmail);
router.put("/forgotPassword/:token", forgotPassword);
// router.put("/changePassword", changePassword);

module.exports = router;
