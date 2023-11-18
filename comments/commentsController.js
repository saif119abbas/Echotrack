const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { comment, user, educational } = require("../models");
exports.addComment = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const educationalId = req.params.educationalId;
  if (!userId || !educationalId)
    return res.status(404).json({
      status: "failed",
      message: "not found",
    });
  const data = req.body;
  data.userUserId = userId;
  data.educationalId = educationalId;
  comment
    .create(data)
    .then((record) => {
      if (record.length === 1)
        return res.status(201).json({
          status: "success",
          message: "created successfully",
        });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(400).json({
          status: "failure",
          message: "Error in add comment",
        });
      return next(new AppError("An error occurred please try again", 500));
    });
});
exports.editComment = catchAsync(async (req, res, next) => {
  const id = req.params.commentId;
  const data = req.body;
  comment
    .update(data, { where: { id } })
    .then((record) => {
      if (record[0] === 1)
        return res.status(200).json({
          status: "success",
          message: "created successfully",
        });
      else if (record[0] === 0)
        return res.status(404).json({
          status: "falied",
          message: "not found comment",
        });
      else if (record[0] > 1)
        return res.status(403).json({
          status: "falied",
          message: "not allowed",
        });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(400).json({
          status: "failure",
          message: "Error in add comment",
        });
      return next(new AppError("An error occurred please try again", 500));
    });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const id = req.params.commentId;
  const data = req.body;
  comment
    .destroy(data, { where: { id } })
    .then((record) => {
      if (record[0] === 1)
        return res.status(204).json({
          status: "success",
          message: "created successfully",
        });
      else if (record[0] === 0)
        return res.status(404).json({
          status: "falied",
          message: "not found comment",
        });
      else if (record[0] > 1)
        return res.status(403).json({
          status: "falied",
          message: "not allowed",
        });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(400).json({
          status: "failure",
          message: "Error in add comment",
        });
      return next(new AppError("An error occurred please try again", 500));
    });
});
exports.getComments = catchAsync(async (_, res, next) => {
  try {
    const educationalId = req.params.educationalId;
    const comments = await comment.findAll({ where: educationalId });
    if (!comments)
      return res
        .status(404)
        .json({ status: "failed", message: "not found resource" });
    let myData = [];
    for (const item of comments) {
      const data = { description: "", username: "" };
      data.description = item.description;
      const myUser = await user.findOne({
        attributes: ["name"],
        where: { userId: item.userUserId },
      });
      data.username = myUser.name;
      myData.push(data);
    }
    if (myData.length > 0) return res.status(200).json({ data: myData });
    else
      return res.status(404).json({
        status: "failed",
        message: "no comments found",
      });
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occurred please try again", 500));
  }
});
