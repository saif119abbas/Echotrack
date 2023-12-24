const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { report } = require("../models");

// Add a new environmental report
exports.addReport = catchAsync(async (req, res, next) => {
    const { reportType, description, location } = req.body;
    const userId = req.user.id; // Assuming the user's ID is stored in req.user
    const newReport = await report.create({ reportType, description, location, userId });
    res.status(201).json({
        status: "success",
        data: newReport
    });
});

// Get all environmental reports
exports.getAllReports = catchAsync(async (req, res, next) => {
    const reports = await report.findAll();
    res.status(200).json({
        status: "success",
        results: reports.length,
        data: reports
    });
});

// Get a specific environmental report by ID
exports.getReportById = catchAsync(async (req, res, next) => {
    const reportId = req.params.reportId;
    const reportDetails = await report.findByPk(reportId);
    if (!reportDetails) {
        return next(new AppError("No report found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: reportDetails
    });
});

// Update an environmental report
exports.updateReport = catchAsync(async (req, res, next) => {
    const reportId = req.params.reportId;
    const userId = req.user.id; // User's ID from authentication
    const updatedData = req.body;

    const existingReport = await report.findByPk(reportId);
    if (!existingReport) {
        return next(new AppError("No report found with that ID", 404));
    }

    if (existingReport.userId !== userId) {
        return next(new AppError("You are not authorized to update this report", 403));
    }

    await report.update(updatedData, { where: { id: reportId } });
    res.status(200).json({
        status: "success",
        message: "Report updated successfully"
    });
});


// Delete an environmental report
exports.deleteReport = catchAsync(async (req, res, next) => {
    const reportId = req.params.reportId;
    const userId = req.user.id; // User's ID from authentication

    const existingReport = await report.findByPk(reportId);
    if (!existingReport) {
        return next(new AppError("No report found with that ID", 404));
    }

    if (existingReport.userId !== userId) {
        return next(new AppError("You are not authorized to delete this report", 403));
    }

    await report.destroy({ where: { id: reportId } });
    res.status(204).send();
});
