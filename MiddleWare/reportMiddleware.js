const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { report } = require("../models");

// Middleware to check if the user is authorized to update/delete the report
exports.verifyReportOwner = catchAsync(async (req, res, next) => {
    const reportId = req.params.reportId;
    const userId = req.user.id; // Assuming user's ID is stored in req.user

    const existingReport = await report.findByPk(reportId);
    if (!existingReport) {
        return next(new AppError("No report found with that ID", 404));
    }

    if (existingReport.userId !== userId) {
        return next(new AppError("You are not authorized to perform this action", 403));
    }

    // Add report to the request object if further use in subsequent middleware/controller is needed
    req.report = existingReport;

    next();
});

module.exports = exports;
