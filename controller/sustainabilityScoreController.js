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
  console.log("calculateScore");
  const userId = req.params.userId;
  //const { pointsPerDataEntry, pointsPerAlert, pointsPerReport } = req.body;
  const pointsPerDataEntry = 5;
  const pointsPerAlert = 10;
  const pointsPerReport = 15;
  const pointsPerEducationalInteraction = 2;
  const pointsPerOpenDataUsage = 3;

  const environmentalDataCount = await environmentalData.count({
    where: { userUserId: userId },
  });
  const environmentalDataPoints = environmentalDataCount * pointsPerDataEntry;

  const environmentalAlertsCount = await environmentalAlerts.count({
    where: { userUserId: userId },
  });
  const environmentalAlertsPoints = environmentalAlertsCount * pointsPerAlert;

  const reportCount = await report.count({ where: { userUserId: userId } });
  const reportPoints = reportCount * pointsPerReport;

  // Assuming you track educational interactions, calculate points for them
  // const educationalInteractionCount = ...
  // const educationalPoints = educationalInteractionCount * pointsPerEducationalInteraction;

  // Assuming you track open data usage, calculate points for it
  // const openDataUsageCount = ...
  // const openDataPoints = openDataUsageCount * pointsPerOpenDataUsage;

  // Total points (include educationalPoints and openDataPoints if applicable)
  let totalScore =
    environmentalDataPoints + environmentalAlertsPoints + reportPoints; // + educationalPoints + openDataPoints;
  const data = { scoreValue: totalScore, userUserId: userId };
  await addDocument(score, data, res, next);
  /*const [userScore, created] = await score.findOrCreate({
        where: { userId: userId },
        defaults: { scoreValue: totalScore }
    });

    if (!created) {
        await score.update({ scoreValue: totalScore }, { where: { userId: userId } });
    }

    res.status(200).json({
        status: "success",
        message: "Sustainability score updated successfully",
        userId: userId,
        sustainabilityScore: totalScore
    });*/
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
