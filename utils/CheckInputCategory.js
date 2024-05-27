const { isString } = require("./validateInput");
exports.checkInputCreateCategory = (data) => {
  let error = [];

  let { name, description } = data;
  if (!name) {
    error.push("name should not be empty");
  }
  if (!isString(name)) {
    error.push("name should not be string");
  }
  if (!description) {
    error.push("description should not be empty");
  }
  if (!isString(description)) {
    error.push("description should not be string");
  }
  return error;
};
