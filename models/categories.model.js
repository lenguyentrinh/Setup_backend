const mongoose = require("mongoose");

const categorychema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: String,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorychema);
module.exports = categoryModel;
