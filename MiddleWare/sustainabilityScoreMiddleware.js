const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { score } = require("../models");

exports.sustainabilityScoreMiddleware = catchAsync(async (req, res, next) => {
    const userUserId = req.params.userId;
    const requesterId = req.user.id; 

    if (!userUserId) {
        return res.status(404).json({
            status: "failed",
            message: "User ID not provided"
        });
    }

    try {
        const userScore = await score.findOne({
            attributes: ["userId"],
            where: { userId: userUserId },
        });

        
        if (!userScore || userScore.userId !== parseInt(requesterId)) {
            return res.status(403).json({
                status: "failure",
                message: "Not authorized to access this user's sustainability score"
            });
        } 

        return next();
    } catch (err) {
        console.log(err);
        return next(new AppError("An error occurred, please try again", 500));
    }
});
