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
    if (!user || user.userUserId !== userUserId)
      return res.status(403).json({
        status: "failed",
        message: "not allowed",
      });
    else if (user.userUserId === userUserId) return next();
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
