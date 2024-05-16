const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth.route.js");
const usersRouter = require("./routes/users.route.js");
const { connectDB } = require("./config/connectDB.js");

//connectDb
connectDB();
// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
