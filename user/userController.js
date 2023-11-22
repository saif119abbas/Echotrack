const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { user, environmentalData } = require("../models");
const { addDocument, updateDocument } = require("../handleFactory");
exports.addProfile = catchAsync(async (req, res, next) => {
  const data = req.body;
  if (data.password !== data.confirmPassword)
    return res.status(400).json({
      status: "failed",
      message: "password not match with comfirm password",
    });
  data.password = await new Promise((resolve, reject) => {
    bcrypt.hash(data.password, 12, (err, hash) => {
      if (err) {
        reject(new AppError("an error occurred please try again", 500));
      } else {
        resolve(hash);
      }
    });
  });
  data.confirmPassword = undefined;
  return addDocument(user, data, res, next);
});
exports.editProfile = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log("The Data", data);
  const userId = req.params.userId;
  if (data.password) {
    if (data.password !== data.confirmPassword)
      return res.status(400).json({
        status: "failed",
        message: "password not match with comfirm password",
      });
    data.password = await new Promise((resolve, reject) => {
      bcrypt.hash(data.password, 12, (err, hash) => {
        if (err) {
          reject(new AppError("an error occurred please try again", 500));
        } else {
          resolve(hash);
        }
      });
    });
    data.confirmPassword = undefined;
  }
  const condition = { userId };
  updateDocument(user, data, condition, res, next);
});
