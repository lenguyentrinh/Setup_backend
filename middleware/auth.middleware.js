const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");

exports.isLogin = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel
        .findOne({ _id: decoded._id })
        .select("-password");
      next();
    } else {
      res.json({
        message: "Please login!",
        error: "Please login!",
        statusCode: 403,
      });
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: error.message,
      statusCode: 403,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user && req.user.role == 0) {
      next();
    } else {
      res.json({
        message: "Forbidden resource",
        error: "Forbidden",
        statusCode: 403,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
