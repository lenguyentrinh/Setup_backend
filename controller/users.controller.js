const {
  forgotSendEmail,
  forgotPassword,
  changePassword,
  createUser,
  findOneUser,
  findAllUser,
  removeUser,
  updateUser,

  // findOne,
} = require("../services/users.service");
const {
  checkInputCreateUser,
  checkInputUpdateUser,
} = require("../utils/checkInputUser");

exports.forgotSendEmail = async (req, res) => {
  let result = await forgotSendEmail(req.body);
  return res.json({
    success: result.success,
    error: result.error,
  });
};

exports.forgotPassword = async (req, res) => {
  let { password } = req.body;
  let token = req.params.token;
  let result = await forgotPassword(token, password);
  return res.json({
    success: result.success,
    error: result.error,
  });
};
exports.changePassword = async (req, res) => {
  let result = await changePassword(req.body);
  return res.json({
    success: result.success,
    error: result.error,
  });
};
exports.createUser = async (req, res) => {
  let error = checkInputCreateUser(req.body);
  if (error.length == 0) {
    let result = await createUser(req.body);
    return res.json({
      user: result.user,
      message: result.message,
      error: result.error,
      statusCode: result.statusCode,
      token: result.token,
    });
  } else {
    res.json({ message: error, error: "Bad Request", statusCode: 400 });
  }
};

exports.findOneUser = async (req, res) => {
  let result = await findOneUser(req.params.id);
  return res.json({
    user: result.user,
    message: result.message,
    error: result.error,
    statusCode: result.statusCode,
    token: result.token,
  });
};
exports.findAllUser = async (req, res) => {
  try {
    console.log("check");
    let resutl = await findAllUser();
    res.json({ allUser: resutl.allUser });
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.removeUser = async (req, res) => {
  try {
    let resutl = await removeUser(req.params.id);
    res.json({ user: resutl.user });
  } catch (error) {
    return res.json({
      message: error.message,
      error: error.error,
      statusCode: error.statusCode,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let error = checkInputUpdateUser(req.body);
    if (error.length == 0) {
      let result = await updateUser(req.params.id, req.body);
      res.json({
        user: result.user,
        message: result.message,
        error: result.error,
        statusCode: result.statusCode,
      });
    } else {
      res.json({ message: error, error: "Bad Request", statusCode: 400 });
    }
  } catch (error) {
    return res.json({
      message: error.message,
      error: error.error,
      statusCode: error.statusCode,
    });
  }
};
