const bcrypt = require("bcryptjs");
const userModel = require("../models/users.model");
var salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  validateUserByToken,
  hashUserPassword,
} = require("../config/commonFunction");
exports.forgotSendEmail = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await findUserByEmail(data.email);
      if (!user) {
        resolve({ error: "Email not found!!!" });
      } else {
        let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        user.resetToken = token;
        console.log(token);

        resolve({ success: "Check your email to reset password" });
      }
    } catch (error) {
      reject({ error: error });
    }
  });
};
exports.forgotPassword = async (token, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await validateUserByToken(token);
      if (result.status === 1) {
        let decode = result.decode;
        let email = decode.email;
        let user = await findUserByEmail(email);
        if (!user) {
          resolve({ error: "Token is expired !!" });
        } else {
          let hashedPassword = await hashUserPassword(password);
          user.password = hashedPassword;
          user.resetToken = "";
          await user.save();
          resolve({ success: "Update password success" });
        }
      } else {
        resolve({ error: "Token is error !!" });
      }
    } catch (error) {
      reject({ error: error });
    }
  });
};
