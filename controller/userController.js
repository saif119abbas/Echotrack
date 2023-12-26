const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { user, environmentalData } = require("../models");
const { addDocument, updateDocument } = require("../handleFactory");
const { createSendToken } = require("../utils/createToken");

exports.login = catchAsync(async (req, res, next) => {
  try {
    const data = req.body;
    console.log("data:", data);
    const myUser = await user.findOne({
      attributes: ["password", "userId", "role"],
      where: { email: data.email },
    });
    if (!myUser)
      return res.status(400).json({
        status: "failed",
        message: "email or password incorrect",
      });
    const password = myUser.password;
    const isTrue = new Promise((resolve, reject) => {
      bcrypt.compare(data.password, password, (err, isCorrect) => {
        if (err) reject(err);
        resolve(isCorrect);
      });
    });
    if (isTrue) {
      data.password = undefined;
      data.id = myUser.userId;
      data.role = myUser.role;
      return createSendToken(data, 200, "24h", res);
    }
    else {
      return res.status(400).json({
      status: "failed",
      message: "email or password incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return next(new AppError("An error occured please try again", 500));
  }
});
exports.addProfile = catchAsync(async (req, res, next) => {
  const data = req.body;
  if (data.password !== data.confirmPassword)
    return res.status(400).json({
      status: "failed",
      message: "password not match with comfirm password",
    });
  data.password = await new Promise((resolve, reject) => {
    bcrypt.hash(data.password, 12, (err, hash) => {
      if (err) {
        reject(new AppError("an error occurred please try again", 500));
      } else {
        resolve(hash);
      }
    });
  });
  data.confirmPassword = undefined;
  return addDocument(user, data, res, next);
});
exports.editProfile = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log("The Data", data);
  const userId = req.params.userId;
  if (data.password) {
    if (data.password !== data.confirmPassword)
      return res.status(400).json({
        status: "failed",
        message: "password not match with comfirm password",
      });
    data.password = await new Promise((resolve, reject) => {
      bcrypt.hash(data.password, 12, (err, hash) => {
        if (err) {
          reject(new AppError("an error occurred please try again", 500));
        } else {
          resolve(hash);
        }
      });
    });
    data.confirmPassword = undefined;
  }
  const condition = { userId };
  updateDocument(user, data, condition, res, next);
});
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  console.log("dhfgl;jasio");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Yes");
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
  }

  /* if (localStorage.getItem("jwt") !== token)
    return next(new AppError("someerror happen please try again", 401));*/

  // 2) Verification token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return next(
        new AppError("An error occurred while verifying the token.", 500)
      );
    }
    console.log("##", decoded.iat - Date.now());
    /* if (Date.now() / 1000 - res.iat <= res.exp)
      return next(new AppError("Timed out please try again", 401));*/
    // 3) Check if user still exists
    user
      .findOne({
        where: { userId: req.params.userId },
      })
      .then((data) => {
        /*if (!data) {
          return res.status(401).json({
            status: "failed",
            message: "Unauthorized",
          });
        }*/
        // 4) Check if user changed password after the token was issued
        /*if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next(
            new AppError("User recently changed password! Please log in again.", 401)
          );
        }*/
        // GRANT ACCESS TO PROTECTED ROUTE
        return next();
      });
  });
});
