const express = require("express");
const router = express.Router();
const {
  forgotSendEmail,
  forgotPassword,
  changePassword,
  createUser,
  findOneUser,
  findAllUser,
  removeUser,
  updateUser,
  // findOne,
} = require("../controller/users.controller");
const { isLogin, isAdmin } = require("../middleware/auth.middleware");

const {
  signup,
  login,
  loginGoogle,
  confirmCode,
} = require("../controller/auth.controller.js");

//auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/loginGoogle", loginGoogle);
router.post("/confirmCode/:token", confirmCode);
//user
router.post("/forgotPassword", forgotSendEmail);
router.put("/forgotPassword/:token", forgotPassword);
///thiếu xác thức
router.put("/changePassword", changePassword);

//admin
router.post("/", createUser);
router.get("/", findAllUser);
router.delete("/:id", removeUser);
router.put("/:id", updateUser);

router.get("/:id", findOneUser);

// router.post("/:id", findOne);

module.exports = router;
