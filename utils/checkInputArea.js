const { isString } = require("./validateInput");
exports.checkInputCreateArea = (data) => {
  let error = [];

  let { name, place } = data;
  if (!name) {
    error.push("name should not be empty");
  }
  if (!isString(name)) {
    error.push("name should not be string");
  }
  if (!place) {
    error.push("place should not be empty");
  }
  if (!isString(place)) {
    error.push("place should not be string");
  }
  return error;
};
