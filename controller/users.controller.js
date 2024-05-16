const { forgotSendEmail, forgotPassword } = require("../services/user.service");

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
// exports.changePassword= async(req,res)=>{
//   let result =await changePassword( req.body)
//   return res.json({
//     success: result.success,
//     error: result.error,
//   });
// }
