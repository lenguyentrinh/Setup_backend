const categoryModel = require("../models/categories.model");

exports.createCategory = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(":test");
      let { name, description } = data;
      let newCategory = await categoryModel.create({
        name: name,
        description: description,
      });
      newCategory.save();
      resolve({ category: newCategory });
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.findAllCategory = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allCategory = await categoryModel.find({ isDeleted: false });
      resolve({ allCategory: allCategory });
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};
exports.findOneCategory = async (idCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await categoryModel.findOne({
        _id: idCategory,
        isDeleted: false,
      });

      if (category !== null) {
        resolve({ category: category });
      } else {
        resolve({
          message: "Category not found",
          error: "Not Found",
          statusCode: 404,
        });
      }
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.updateCategory = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, description } = data;

      let updatedArea = await categoryModel.findByIdAndUpdate(
        id,
        { name: name, description: description },
        { new: true, runValidators: true }
      );
      resolve({ category: updatedArea });
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};

exports.removeCategory = async (idCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await categoryModel.findByIdAndUpdate(
        idCategory,
        { isDeleted: true },
        { new: true, runValidators: true }
      );
      resolve({ category: category });
    } catch (error) {
      reject({ message: error, error: "Bad Request", statusCode: 400 });
    }
  });
};
