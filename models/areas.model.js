const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    place: {
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

const areaModel = mongoose.model("areas", areaSchema);
module.exports = areaModel;
