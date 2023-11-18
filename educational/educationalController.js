const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { educational } = require("../models");
exports.addRecource = catchAsync(async (req, res, next) => {
  const data = req.body;
  educational
    .create(data)
    .then((record) => {
      if (record.length === 1)
        return res.status(201).json({
          status: "success",
          message: "created successfully",
        });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(400).json({
          status: "failure",
          message: "you have already created this threshold",
        });
      return next(new AppError("An error occurred please try again", 500));
    });
});
exports.getRecouces = catchAsync(async (_, res, next) => {
  try {
    const resources = await educational.findAll();
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
    if (resources) return res.status(200).json({ resources });
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
exports.getRecoucesById = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const resources = await educational.findOne({ where: { id } });
    if (resources) return res.status(200).json({ resources });
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
exports.getRecoucesByCategory = catchAsync(async (req, res, next) => {
  try {
    const category = req.params.category;
    const resources = await educational.findOne({ where: { category } });
    if (resources) return res.status(200).json({ resources });
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
