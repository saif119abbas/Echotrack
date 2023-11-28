const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { comment, user } = require("../models");
const {
  addDocument,
  updateDocument,
  deleteDocument,
} = require("../handleFactory");
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
  console.log("data: ", data);
  addDocument(comment, data, res, next);
});
exports.editComment = catchAsync(async (req, res, next) => {
  const id = req.params.commentId;
  const data = req.body;
  const condition = { id };
  updateDocument(comment, data, condition, res, next);
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const id = req.params.commentId;
  const condition = { id };
  deleteDocument(comment, condition, res, next);
});
exports.getComments = catchAsync(async (req, res, next) => {
  try {
    const educationalId = req.params.educationalId;
    const comments = await comment.findAll({ where: { educationalId } });
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
