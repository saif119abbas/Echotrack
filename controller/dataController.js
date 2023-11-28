const catchAsync = require("../utils/catchAsync");
const { environmentalData } = require("../models");
const {
  addDocument,
  updateDocument,
  deleteDocument,
} = require("../handleFactory");
exports.addData = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId)
    return res.status(404).json({
      status: "failed",
      message: "not found",
    });
  const data = req.body;
  data.userUserId = userId;
  addDocument(environmentalData, data, res, next);
});
exports.editData = catchAsync(async (req, res, next) => {
  const dataId = req.params.dataId;
  const data = req.body;
  const condition = { dataId };
  updateDocument(environmentalData, data, condition, res, next);
});

exports.deleteData = catchAsync(async (req, res, next) => {
  const dataId = req.params.dataId;
  const condition = { dataId };
  deleteDocument(environmentalData, condition, res, next);
});
