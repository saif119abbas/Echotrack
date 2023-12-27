const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
//const { user, score } = require("../models");
const {
  environmentalData,
  environmentalAlerts,
  report,
  educational,
  openData,
  score,
  user,
} = require("../models");
const { addDocument, updateDocument } = require("../handleFactory");
//const { response } = require("../app");

exports.calculateAndUpdateScore = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const pointsPerDataEntry = 5;
  const pointsPerEducationalResource = 2;
  const pointsPerReport = 10; // Points for each report submitted
  const pointsPerComment = 1;  // Points for each comment made

  
  const environmentalDataCount = await environmentalData.count({ where: { userUserId: userId } });
  const environmentalDataPoints = environmentalDataCount * pointsPerDataEntry;

 
  const educationalResourceCount = await educational.count({ where: { userUserId: userId } });
  const educationalPoints = educationalResourceCount * pointsPerEducationalResource;

 
  const reportCount = await report.count({ where: { userUserId: userId } });
  const reportPoints = reportCount * pointsPerReport;

  
  const commentCount = await comment.count({ where: { userUserId: userId } });
  const commentPoints = commentCount * pointsPerComment;

 
  let totalScore = environmentalDataPoints + educationalPoints + reportPoints + commentPoints;

 
  const data = { scoreValue: totalScore, userUserId: userId };
  await addDocument(score, data, res, next);
});


exports.getUserScore = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const userScore = await score.findOne({ where: { userId: userId } });

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
