exports.isEmail = function (mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};
exports.isString = function (value) {
  return typeof value === "string" || value instanceof String;
};
