const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

const {
  findUserByEmail,
  validateUserByToken,
  hashUserPassword,
  findUserByPhone,
} = require("../utils/commonFunction");
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
        resolve({ success: "Check your email to reset password" });
      }
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
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
      reject({ message: error, error: "Bad Request", statusCode: 400 });
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
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};
exports.createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await findUserByEmail(data.email);
      if (user) {
        resolve({
          message: "Phone is existing !!! Please try another phone",
          error: "Bad Request",
          statusCode: 400,
        });
      } else {
        let userByPhone = await findUserByPhone(data.phone);
        if (userByPhone) {
          resolve({
            message: "Phone is existing !!! Please try another phone",
            error: "Bad Request",
            statusCode: 400,
          });
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
          resolve({ message: "Created success user" });
        }
      }
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

// exports.findAll
exports.findOneUser = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await userModel.findOne({ _id: idUser, isActive: true });
      if (user) {
        resolve({ user: user });
      } else {
        resolve({
          mesage: "User isn't found!",
          error: "User isn't found!",
          statusCode: 404,
        });
      }
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.findAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allUser = await userModel.find({ isActive: true });
      resolve({ allUser: allUser });
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.updateUser = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { fullName, email, phone, role, address, nation, postCode } = data;
      let user = await findUserByEmail(data.email);
      if (user) {
        resolve({
          message: "Email is existing !!! Please try another phone",
          error: "Bad Request",
          statusCode: 400,
        });
      } else {
        let userByPhone = await findUserByPhone(data.phone);
        if (userByPhone) {
          resolve({
            message: "Phone is existing !!! Please try another phone",
            error: "Bad Request",
            statusCode: 400,
          });
        } else {
          console.log("check");
          let updateUser = await userModel.findByIdAndUpdate(
            id,
            {
              fullName: fullName,
              email: email,
              phone: phone,
              role: role,
              address: address,
              postCode: postCode,
              nation: nation,
            },
            { new: true, runValidators: true }
          );
          (await updateUser).save;
          resolve({ user: updateUser });
        }
      }
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.removeUser = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await userModel.findByIdAndUpdate(
        idUser,
        { isActive: false },
        { new: true, runValidators: true }
      );
      resolve({ user: user });
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};
