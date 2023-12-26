const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { educational } = require("../models");
const { addDocument } = require("../handleFactory");
exports.addRecource = catchAsync(async (req, res) => {
  const data = req.body;
  addDocument(educational, data, res);
});
exports.getRecouces = catchAsync(async (_, res, next) => {
  try {
    console.log("resources");
    const resources = await educational.findAll();
    console.log(resources);
    if (resources) return res.status(200).json({ resources });
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
exports.getRecoucesByTitle = catchAsync(async (req, res, next) => {
  try {
    const title = req.params.title;
    const resources = await educational.findAll({ where: { title } });
    if (!resources || resources.length === 0)
      return res.status(404).json({
        message: "no resource found of this title",
      });
    return res.status(200).json({ resources });
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
exports.getRecoucesById = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const resources = await educational.findOne({ where: { id } });
    if (!resources || resources.length === 0)
      return res.status(404).json({
        message: "no resource found",
      });
    return res.status(200).json({ resources });
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
exports.getRecoucesByCategory = catchAsync(async (req, res, next) => {
  try {
    const category = req.params.category;
    const resources = await educational.findAll({ where: { category } });
    if (!resources || resources.length === 0)
      return res.status(404).json({
        message: "no resource found of this category",
      });
    return res.status(200).json({ resources });
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
