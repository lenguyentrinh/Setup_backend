const bcrypt = require("bcryptjs");
const userModel = require("../models/users.model");
var salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  findUserByPhone,
  validateUserByToken,
  hashUserPassword,
} = require("../utils/commonFunction");
exports.signup = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await findUserByEmail(data.email);
      if (!user) {
        let userByPhone = await findUserByPhone(data.phone);
        if (!userByPhone) {
          const token = jwt.sign(
            { email: data.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          let hashPasswordFromBcrypt = await hashUserPassword(data.password);
          let newUser = await userModel.create({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            avatar: data.avatar,
            nation: data.nation,
            postcode: data.postcode,
            password: hashPasswordFromBcrypt,
            code: data.code,
            role: data.role,
            resetToken: data.resetToken,
            createToken: token,
            area: data.area,
          });
          newUser.save();
          let userOject = newUser.toObject();
          delete userOject.password;
          resolve({ user: userOject });
        } else {
          resolve({
            message: "Phone is existing !!! Please try another phone",
            error: "Bad Request",
            statusCode: 400,
          });
        }
      } else {
        resolve({
          message: "Email is existing !!! Please try another email",
          error: "Bad Request",
          statusCode: 400,
        });
      }
    } catch (error) {
      console.log;
      reject(error);
    }
  });
};

exports.login = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await findUserByEmail(data.email);
      console.log(user);
      if (!user) {
        resolve({
          message: "Email is incorrect!",
          error: "Not Found",
          statusCode: 404,
        });
      } else {
        const comparePassword = await bcrypt.compare(
          data.password,
          user.password
        );
        if (comparePassword) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          let userOject = user.toObject();
          delete userOject.password;
          resolve({
            token: token,
            user: userOject,
          });
        } else {
          resolve({
            message: "Password is incorrect",
            error: "Bad Request",
            statusCode: 400,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.loginGoogle = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await findUserByEmail(data.email);
      if (!user) {
        let newUser = await userModel.create({
          fullName: data.name,
          email: data.email,
          avatar: data.photo,
        });
        newUser.save();
        let token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        resolve({ user: newUser, access_token: token });
      } else {
        let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        resolve({ user: user, access_token: token });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.confirmCode = async (code, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await validateUserByToken(token);
      if (result.status === 1) {
        let decode = result.decode;
        let email = decode.email;
        console.log(email);
        let user = await findUserByEmail(email);
        console.log("code", code);
        console.log("User code", user.code);
        if (!user) {
          resolve({ error: "Invalid token" });
        } else if (code !== user.code) {
          resolve({ error: "code is incorrect, please check again" });
        } else {
          user.code = "";
          user.save();
          resolve({ success: "Confirm success!!!" });
        }
      } else {
        resolve({ error: "Token is error !!" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
