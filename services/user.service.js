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
      reject(error);
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
      reject(error);
    }
  });
};

exports.changePassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = data.user;
      if (!user) {
        resolve({ error: "Unauthentication !!!" });
      } else {
        let isMatch = bcrypt.compareSync(data.password, user.password);
        console.log(isMatch);

        if (!isMatch) {
          resolve({ error: "Old password is incorrect!!!" });
        } else {
          let hashedPassword = await hashUserPassword(data.newPassword);
          user.password = hashedPassword;
          let result = await userModel.updateOne(
            { email: user.email },
            { $set: { password: hashedPassword } },
            { upsert: true }
          );
          resolve({ success: "'Change password success!!!'" });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.create = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await findUserByEmail(data.email);
      console.log("oke");
      if (user) {
        resolve({ error: "Email is existing!!!! Please give another email" });
      } else {
        let password = Math.floor(Math.random() * 8);
        let hashedPassword = await hashUserPassword(password.toString());

        let newUser = userModel.create({
          email: data.email,
          fullName: data.fullName,
          phone: data.phone,
          role: data.role,
          area: data.area,
          password: hashedPassword,
        });
        (await newUser).save;
        resolve({ success: "Created success user" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
