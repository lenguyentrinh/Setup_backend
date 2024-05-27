const {
  signup,
  login,
  loginGoogle,
  confirmCode,
} = require("../services/auths.service");
const {
  checkInputSignUp,
  checkInputLogin,
} = require("../utils/checkInputUser");

exports.signup = async (req, res) => {
  let error = checkInputSignUp(req.body);
  if (error.length == 0) {
    try {
      let result = await signup(req.body);
      return res.json({
        user: result.user,
        message: result.message,
        error: result.error,
        statusCode: result.statusCode,
      });
    } catch (error) {
      return res.json({ error: error });
    }
  } else {
    res.json({ message: error, error: "Bad Request", statusCode: 400 });
  }
};
exports.login = async (req, res) => {
  let error = checkInputLogin(req.body);
  if (error.length == 0) {
    let result = await login(req.body);
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

exports.loginGoogle = async (req, res) => {
  let { email, name, photo } = req.body;
  if (!email || !photo || !name) {
    return res.json({ error: "Email, name or photo can't empty!" });
  } else {
    let result = await loginGoogle(req.body);
    return res.json({
      user: result.user,
      access_token: result.access_token,
      error: result.error,
    });
  }
};

exports.confirmCode = async (req, res) => {
  let token = req.params.token;
  let code = req.body.code;
  let result = await confirmCode(code, token);
  return res.json({ error: result.error, success: result.success });
};
