const areaModel = require("../models/areas.model");

exports.findAreaExist = async (place) => {
  return new Promise(async (resolve, reject) => {
    try {
      let area = await areaModel.findOne({ place: place, isDeleted: false });
      console.log("area", area);
      resolve(area);
    } catch (error) {
      reject(error);
    }
  });
};

exports.createArea = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, place } = data;
      let areaExist = await this.findAreaExist(place);
      if (areaExist) {
        resolve({
          message: "Area is existing!!!",
          error: "Bad Request",
          statusCode: 400,
        });
      } else {
        let newArea = await areaModel.create({
          name: name,
          place: place,
        });
        newArea.save();
        resolve({ area: newArea });
      }
      resolve(area);
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.findAllArea = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allArea = await areaModel.find({ isDeleted: false });
      console.log(allArea);
      resolve({ allArea: allArea });
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};
exports.findOneArea = async (idArea) => {
  return new Promise(async (resolve, reject) => {
    try {
      let area = await areaModel.findOne({ _id: idArea, isDeleted: false });

      if (area !== null) {
        resolve({ area: area });
      } else {
        console.log("tesr");
        resolve({
          message: "Area not found",
          error: "Not Found",
          statusCode: 404,
        });
      }
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.updateArea = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, place } = data;
      let areaExist = await this.findAreaExist(place);
      if (areaExist) {
        resolve({
          message: "Area is existing!!!",
          error: "Area is existing",
          statusCode: 404,
        });
      } else {
        let updatedArea = await areaModel.findByIdAndUpdate(
          id,
          { name: name, place: place },
          { new: true, runValidators: true }
        );
        resolve({ area: updatedArea });
      }
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.removeArea = async (idArea) => {
  return new Promise(async (resolve, reject) => {
    try {
      let area = await areaModel.findByIdAndUpdate(
        idArea,
        { isDeleted: true },
        { new: true, runValidators: true }
      );
      resolve({ area: area });
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};
