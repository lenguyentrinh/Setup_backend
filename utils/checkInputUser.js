const { json } = require("express");
const { isEmail, isString } = require("./validateInput");
const roleEnum = {
  ADMIN: 0,
  STAFF: 1,
  SHIP: 2,
  USER: 3,
};
exports.checkInputSignUp = (data) => {
  let error = [];
  let { fullName, email, phone, address, avatar, nation, postcode, password } =
    data;
  if (!email) {
    error.push("email should not be empty");
  }
  if (!isEmail(email)) {
    error.push("email should not be Email");
  }
  if (!password) {
    error.push("password should not be empty");
  }

  if (!isString(password)) {
    error.push("password should not be string");
  }
  if (!fullName) {
    error.push("fullName should not be empty");
  }
  if (!isString(fullName)) {
    error.push("fullName should not be string");
  }
  if (!address) {
    error.push("address should not be empty");
  }

  if (!isString(address)) {
    error.push("address should not be string");
  }
  if (!nation) {
    error.push("nation should not be empty");
  }

  if (!isString(nation)) {
    error.push("nation should not be string");
  }

  if (!phone) {
    error.push("phone should not be empty");
  }
  if (!isString(phone)) {
    error.push("phone should not be string");
  }
  return error;
};

exports.checkInputLogin = (data) => {
  let error = [];
  let { email, password } = data;
  if (!email) {
    error.push("email should not be empty");
  }
  if (!isEmail(email)) {
    error.push("email should not be Email");
  }
  if (!password) {
    error.push("password should not be empty");
  }
  if (!isString(password)) {
    error.push("password should not be string");
  }
  return error;
};

exports.checkInputCreateUser = (data) => {
  let error = [];
  let { fullName, email, phone, role, area } = data;
  if (!email) {
    error.push("email should not be empty");
  }
  if (!isEmail(email)) {
    error.push("email should not be Email");
  }
  if (!fullName) {
    error.push("fullName should not be empty");
  }
  if (!isString(fullName)) {
    error.push("fullName should not be string");
  }

  if (!phone) {
    error.push("phone should not be empty");
  }
  if (!isString(phone)) {
    error.push("phone should not be string");
  }

  if (!role) {
    error.push("role should not be empty");
  }
  if (!Object.values(roleEnum).includes(role)) {
    error.push("Invalid role value");
  }

  return error;
};
exports.checkInputUpdateUser = (data) => {
  let error = [];
  let { fullName, email, phone, role, address, nation, postCode } = data;
  if (!email) {
    error.push("email should not be empty");
  }
  if (!isEmail(email)) {
    error.push("email should not be Email");
  }
  if (!fullName) {
    error.push("fullName should not be empty");
  }
  if (!isString(fullName)) {
    error.push("fullName should not be string");
  }
  if (!phone) {
    error.push("phone should not be empty");
  }
  if (!isString(phone)) {
    error.push("phone should not be string");
  }

  if (!role) {
    error.push("role should not be empty");
  }
  if (!Object.values(roleEnum).includes(role)) {
    error.push("Invalid role value");
  }

  if (!address) {
    error.push("address should not be empty");
  }
  if (!isString(address)) {
    error.push("address should not be string");
  }
  if (!nation) {
    error.push("nation should not be empty");
  }
  if (!isString(nation)) {
    error.push("nation should not be string");
  }
  if (!postCode) {
    error.push("postCode should not be empty");
  }
  if (!isString(postCode)) {
    error.push("postCode should not be string");
  }
  return error;
};
