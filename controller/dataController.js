const catchAsync = require("../utils/catchAsync");
const { environmentalData } = require("../models");
const {
  addDocument,
  updateDocument,
  deleteDocument,
} = require("../handleFactory");
exports.addData = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  if (!userId)
    return res.status(404).json({
      status: "failed",
      message: "not found",
    });
  const data = req.body;
  data.userUserId = userId;
  addDocument(environmentalData, data, res);
});
exports.editData = catchAsync(async (req, res) => {
  const dataId = req.params.dataId;
  const data = req.body;
  const condition = { dataId };
  updateDocument(environmentalData, data, condition, res);
});

exports.deleteData = catchAsync(async (req, res) => {
  const dataId = req.params.dataId;
  const condition = { dataId };
  deleteDocument(environmentalData, condition, res);
});
exports.getMyData = catchAsync(async (req, res) => {
  const userUserId = req.params.userId;
  const data = await new Promise((resolve) => {
    environmentalData
      .findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          userUserId,
        },
      })
      .then((record) => {
        resolve(record);
      });
  });
  return res.status(200).json({ data });
});
