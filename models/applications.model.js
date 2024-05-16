const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      default: 0,
    },
    direction: {
      type: String,
      enum: ["Departure Shipment", "Arrival Shipment"],
      default: "Departure Shipment",
    },
    from: {
      type: String,
      maxlength: 255,
    },
    to: {
      type: String,
      maxlength: 255,
    },
    sentDate: {
      type: Date,
    },
    estimatedDate: {
      type: Date,
    },
    phoneSent: {
      type: String,
      match: [/^\d{10}$/, "Phone number  is invalid"],
      required: true,
      trim: true,
      index: { unique: true },
    },
    phoneReceive: {
      type: String,
      match: [/^\d{10}$/, "Phone number  is invalid"],
      required: true,
      trim: true,
      index: { unique: true },
    },
    emailSent: {
      type: String,
      match: [
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        "Email is invalid.",
      ],
      required: true,
      trim: true,
      index: { unique: true },
    },
    emailReceive: {
      type: String,
      match: [
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        "Email is invalid.",
      ],
      required: true,
      trim: true,
      index: { unique: true },
    },
    companyId: {
      type: Number,
      default: null,
    },
    staffsId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", applicationSchema);
module.exports = userModel;
