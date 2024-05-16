const {
  forgotSendEmail,
  forgotPassword,
  changePassword,
  create,
} = require("../services/user.service");
const { validateEmail } = require("../config/validateInput");

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
exports.create = async (req, res) => {
  let { fullName, email, phone, role, area } = req.body;

  if (!fullName || !email || !phone || !role) {
    return res.json({
      fullName: "Filed must not be empty",
      email: "Filed must not be empty",
      phone: "Filed must not be empty",
      role: "Filed must not be empty",
      area: "Filed must not be empty",
    });
  }
  if (!validateEmail(email)) {
    return res.json({ error: "Email is not valid" });
  } else {
    let result = await create(req.body);

    return res.json({
      success: result.success,
      error: result.error,
    });
  }
};
// exports.findAll = async (req, res) => {
//   let result = await findAll(req.body);

//   return res.json({
//     success: result.success,
//     error: result.error,
//   });
// };
