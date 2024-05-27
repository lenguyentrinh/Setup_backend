const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);

exports.validateUserByToken = async (token) => {
  const decode = jwt.decode(token);
  console.log(decode);
  if (decode) {
    return { status: 1, decode: decode };
  } else {
    return { status: 0 };
  }
};
exports.findUserByEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await userModel
        .findOne({ email: email, isActive: true })
        .populate("area");

      if (user) {
        resolve(user);
      } else {
        resolve("");
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.findUserByPhone = async (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await userModel
        .findOne({ phone: phone, isActive: true })
        .populate("area");
      if (user) {
        resolve(user);
      } else {
        resolve("");
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.hashUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
