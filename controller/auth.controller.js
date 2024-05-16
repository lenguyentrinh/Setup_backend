const {
  signup,
  login,
  loginGoogle,
  confirmCode,
} = require("../services/auth.service");
const { validateEmail } = require("../config/validateInput");

exports.signup = async (req, res) => {
  let { fullName, email, phone, address, avatar, nation, postcode, password } =
    req.body;

  if (!fullName || !email || !phone || !address || !nation || !postcode) {
    return res.json({
      fullName: "Filed must not be empty",
      email: "Filed must not be empty",
      phone: "Filed must not be empty",
      address: "Filed must not be empty",
      nation: "Filed must not be empty",
      postcode: "Filed must not be empty",
      password: "Filed must not be empty",
    });
  }
  try {
    if (validateEmail(email)) {
      let result = await signup(req.body);
      return res.json({
        error: result.error,
        user: result.user,
      });
    } else {
      return res.json({ error: "Email is not valid" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
};
exports.login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: "Fields must not be empty",
    });
  } else {
    let result = await login(req.body);
    return res.json({
      error: result.error,
      user: result.user,
      token: result.token,
    });
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
