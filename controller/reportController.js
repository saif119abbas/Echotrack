const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { report } = require("../models");

// Add a new environmental report
exports.addReport = catchAsync(async (req, res) => {
  const { reportType, description, location } = req.body;
  const userUserId = req.params.userId;
  await report.create({
    reportType,
    description,
    location,
    userUserId,
  });
  res.status(201).json({
    status: "success",
    message: "created successfully",
  });
});

// Get all environmental reports
exports.getAllReports = catchAsync(async (_, res) => {
  //  const userUserId = req.params.userId;
  //condition ={where:{ userUserId}}
  const reports = await report.findAll();
  res.status(200).json({
    status: "success",
    results: reports.length,
    data: reports,
  });
});

exports.getReportsByUser = catchAsync(async (req, res) => {
  console.log("userUserId");
  const userUserId = req.params.userId; 
  const userReports = await report.findAll({
    where: { userUserId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  res.status(200).json({
    data: userReports,
  });
});

exports.getReportById = catchAsync(async (req, res, next) => {
  const reportId = req.params.reportId;
  const reportDetails = await report.findByPk(reportId);
  if (!reportDetails) {
    return next(new AppError("No report found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: reportDetails,
  });
});


exports.updateReport = catchAsync(async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const userUserId = req.params.userId;
    const updatedData = req.body;
    await report
      .update(updatedData, { where: { reportId, userUserId } })
      .then((count) => {
        if (count[0] === 1)
          return res.status(200).json({
            status: "success",
            message: "Report updated successfully",
          });
        else if (count[0] === 0)
          return res.status(404).json({
            status: "failuer",
            message: "not found",
          });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failuer",
      message: "Internal server error",
    });
  }
});

exports.deleteReport = catchAsync(async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const userUserId = req.params.userId;

    await report.destroy({ where: { reportId, userUserId } }).then((count) => {
      if (count === 1) return res.status(204).send();
      else
        return res.status(404).json({
          status: "failuer",
          message: "not found",
        });
    });
  } catch (err) {
    return res.status(500).json({
      status: "failuer",
      message: "Internal server error",
    });
  }
});
