const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () =>
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log(
        "==============Mongodb Database Connected Successfully=============="
      )
    )
    .catch((err) => console.log(err));
