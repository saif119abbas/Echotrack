const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { environmentalData } = require("../models");
exports.dataMiddleWare = catchAsync(async (req, res, next) => {
  const userUserId = req.params.userId;
  const dataId = req.params.dataId;
  if (!userUserId || !dataId)
    return res.status(404).json({
      status: "failed",
      message: "not found",
    });
  try {
    const user = await environmentalData.findOne({
      attributes: ["userUserId"],
      where: { dataId },
    });
    console.log("user id", user.userUserId);
    console.log("id", userUserId);
    if (!user || user.userUserId !== parseInt(userUserId))
      return res.status(403).json({
        status: "failure",
        message: "not allowed",
      });
    else if (user.userUserId === parseInt(userUserId)) return next();
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
