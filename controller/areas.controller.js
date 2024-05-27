const {
  createArea,
  findAllArea,
  findOneArea,
  removeArea,
  updateArea,
} = require("../services/areas.service");
const { checkInputCreateArea } = require("../utils/checkInputArea");
exports.createArea = async (req, res) => {
  let error = checkInputCreateArea(req.body);
  if (error.length == 0) {
    try {
      console.log("test");
      let result = await createArea(req.body);
      return res.json({
        area: result.area,
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

exports.findAllArea = async (req, res) => {
  try {
    let resutl = await findAllArea();
    res.json({ allArea: resutl.allArea });
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.findOneArea = async (req, res) => {
  try {
    console.log("test", req.params.id);
    let result = await findOneArea(req.params.id);
    res.json({
      area: result.area,
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

exports.removeArea = async (req, res) => {
  try {
    let resutl = await removeArea(req.params.id);
    res.json({ area: resutl.area });
  } catch (error) {
    return res.json({
      message: error.message,
      error: error.error,
      statusCode: error.statusCode,
    });
  }
};

exports.updateArea = async (req, res) => {
  try {
    let result = await updateArea(req.params.id, req.body);
    res.json({
      area: result.area,
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
