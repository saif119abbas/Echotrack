const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { comment } = require("../models");
exports.commentMiddleWare = catchAsync(async (req, res, next) => {
  const userUserId = req.params.userId;
  const commentId = req.params.commentId;
  if (!userUserId || !commentId)
    return res.status(404).json({
      status: "failed",
      message: "not found",
    });
  try {
    const user = await comment.findOne({
      attributes: ["userUserId"],
      where: { id: commentId },
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
