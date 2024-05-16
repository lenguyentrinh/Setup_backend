const mongoose = require("mongoose");
const roleEnum = {
  ADMIN: 0,
  STAFF: 1,
  SHIP: 2,
  USER: 3,
};

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
    },
    phone: {
      type: String,
      // required: true,
      trim: true,
      index: { unique: true },
    },
    address: {
      type: String,
      // required: true,
      // default: "Da Nang",
    },
    avatar: {
      type: String,
      default: "/defaultAvatar.png",
    },
    nation: {
      type: String,
      required: true,
      default: "Viet Nam",
    },
    postcode: {
      type: String,
      required: true,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      // required: true,
    },
    code: {
      type: String,
      default: null,
    },
    role: {
      type: Number,
      enum: [roleEnum.ADMIN, roleEnum.STAFF, roleEnum.SHIP, roleEnum.USER],
      default: roleEnum.USER,
    },
    resetToken: {
      type: String,
      default: null,
    },
    createToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
