const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { user } = require("../models");

exports.sustainabilityScoreMiddleware = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
    //const requesterId = req.user.id; 
    console.log("resources");
    if (!userId) {
        return res.status(404).json({
            status: "failed",
            message: "User ID not provided"
        });
    }

    try {
        const userScore = await user.findOne({
            attributes: ["userId"],
            where: { userId: userUserId },
        });

        
        if (!userScore || userScore.userId !== parseInt(userId)) {
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
