const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const { user } = require("../models");
const {
  addDocument,
  updateDocument,
  deleteDocument,
} = require("../handleFactory");
exports.login = catchAsync(async (req, res, next) => {});
