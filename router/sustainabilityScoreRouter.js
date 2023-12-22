const express = require("express");
const {
    calculateAndUpdateScore,
    getUserScore,
    getSustainabilityLeaderboard
} = require('../controller/sustainabilityScoreController');
const { sustainabilityScoreMiddleware } = require('../MiddleWare/sustainabilityScoreMiddleware');
const {
    protect,
  } = require("../controller/userController");

const router = express.Router();

// Route to calculate and update a user's sustainability score
// Here, we assume that the user can only calculate/update their own score
router.post('/score/:userId', protect, sustainabilityScoreMiddleware, calculateAndUpdateScore);

// Route to get a user's current sustainability score
// The middleware ensures that a user can only access their own score or has permission to access others' scores
router.get('/sustainability/:userId/score', protect, sustainabilityScoreMiddleware, getUserScore);

// Route to get the sustainability leaderboard
// Assuming any authenticated user can access the leaderboard
router.get('/sustainability/leaderboard', protect, getSustainabilityLeaderboard);

module.exports = router;
