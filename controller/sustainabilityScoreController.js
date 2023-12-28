const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
//const { user, score } = require("../models");
const {
  environmentalData,
  report,
  educational,
  score,
  user,
  comment,
} = require("../models");
const { addDocument, updateDocument } = require("../handleFactory");

exports.calculateAndUpdateScore = catchAsync(async (req, res) => {
  const userUserId = req.params.userId;
  const pointsPerDataEntry = 5;
  const pointsPerEducationalResource = 2;
  const pointsPerReport = 10; // Points for each report submitted
  const pointsPerComment = 1; // Points for each comment made
  const models = await user.findOne({
    where: { userId: userUserId },
    attributes: [],
    include: [
      {
        model: environmentalData,
        attributes: ["dataId"],
      },
      {
        model: report,
        attributes: ["reportId"],
      },
      {
        model: comment,
        attributes: ["id"],
      },
      {
        model: educational,
        attributes: ["id"],
      },
    ],
  });
  const { reports, comments, educationals } = models;
  const environmentalDataCount = models.environmentalData.length;
  const environmentalDataPoints = environmentalDataCount * pointsPerDataEntry;

  const reportCount = reports.length;
  const reportPoints = reportCount * pointsPerReport;

  const commentCount = comments.length;
  const commentPoints = commentCount * pointsPerComment;

  const educationalCount = educationals.length;
  const educationalPoints = educationalCount * pointsPerEducationalResource;

  let totalScore =
    environmentalDataPoints + reportPoints + commentPoints + educationalPoints;
  const data = { scoreValue: totalScore };
  const condition = { userUserId };
  // return res.status(200).json(models);
  return updateDocument(score, data, condition, res);
});

exports.getUserScore = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const userScore = await score.findOne({ where: { userUserId } });

  if (!userScore) {
    return res.status(404).json({
      status: "fail",
      message: "User score not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      userId: userId,
      sustainabilityScore: userScore.scoreValue,
    },
  });
});

exports.getSustainabilityLeaderboard = catchAsync(async (req, res, next) => {
  const topUsers = await score.findAll({
    limit: 10, // Top 10 users
    order: [["scoreValue", "DESC"]],
    include: [{ model: user, attributes: ["name"] }],
  });

  res.status(200).json({
    status: "success",
    data: {
      leaderboard: topUsers,
    },
  });
});
