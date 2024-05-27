const {
  createCategory,
  findAllCategory,
  findOneCategory,
  removeCategory,
  updateCategory,
} = require("../services/categories.service");
const { checkInputCreateCategory } = require("../utils/CheckInputCategory");
exports.createCategory = async (req, res) => {
  let error = checkInputCreateCategory(req.body);
  if (error.length == 0) {
    try {
      let result = await createCategory(req.body);
      return res.json({
        category: result.category,
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

exports.findAllCategory = async (req, res) => {
  try {
    let resutl = await findAllCategory();
    res.json({ allCategory: resutl.allCategory });
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.findOneCategory = async (req, res) => {
  try {
    let result = await findOneCategory(req.params.id);
    res.json({
      category: result.category,
      message: result.message,
      error: result.error,
      statusCode: result.statusCode,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      error: error.error,
      statusCode: error.statusCode,
    });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    let resutl = await removeCategory(req.params.id);
    res.json({ category: resutl.category });
  } catch (error) {
    return res.json({
      message: error.message,
      error: error.error,
      statusCode: error.statusCode,
    });
  }
};

exports.updateCategory = async (req, res) => {
  let error = checkInputCreateCategory(req.body);
  if (error.length == 0) {
    try {
      let result = await updateCategory(req.params.id, req.body);
      res.json({
        category: result.category,
        message: result.message,
        error: result.error,
        statusCode: result.statusCode,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        error: error.error,
        statusCode: error.statusCode,
      });
    }
  } else {
    res.json({ message: error, error: "Bad Request", statusCode: 400 });
  }
};
