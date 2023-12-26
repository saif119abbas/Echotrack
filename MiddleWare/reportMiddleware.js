const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { report } = require("../models");


exports.verifyReportOwner = catchAsync(async (req, res, next) => {
    const reportId = req.params.reportId;
    const userId = req.user.id;

    const existingReport = await report.findByPk(reportId);
    if (!existingReport) {
        return next(new AppError("No report found with that ID", 404));
    }

    if (existingReport.userId !== userId) {
        return next(new AppError("You are not authorized to perform this action", 403));
    }

    
    req.report = existingReport;

    next();
});

module.exports = exports;
