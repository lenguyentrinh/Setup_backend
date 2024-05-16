const express = require("express");
const router = express.Router();
const {
  forgotSendEmail,
  forgotPassword,
  changePassword,
  create,
} = require("../controller/users.controller");

//user
router.post("/forgotPassword", forgotSendEmail);
router.put("/forgotPassword/:token", forgotPassword);
///thiếu xác thức
router.put("/changePassword", changePassword);

//admin
router.post("/create", create);

module.exports = router;
