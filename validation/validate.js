const {
  createAlertValidation,
  editAlertValidation,
} = require("./alretValidation");
const {
  createEducationalValidation,
  editEducationalValidation,
} = require("./educationalValidation");
const { addUserValdition, editUserValdition } = require("./userValidation");
const { addData, editData } = require("./dataValidation");
const { commentValidation } = require("./commentsValidation");
exports.validtaeAddUser = (req, res, next) => {
  const data = req.body;
  const { error, _ } = addUserValdition.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  next();
};
exports.validtaeEditUser = (req, res, next) => {
  const data = req.body;
  const { error, _ } = editUserValdition.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  return next();
};
exports.validtaeAddData = (req, res, next) => {
  const data = req.body;
  const { error, _ } = addData.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  next();
};
exports.validtaeEditData = (req, res, next) => {
  const data = req.body;
  const { error, _ } = editData.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  return next();
};
exports.validtaeNewAlert = (req, res, next) => {
  const data = req.body;
  const { error, _ } = createAlertValidation.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  next();
};
exports.validtaeEditedAert = (req, res, next) => {
  const data = req.body;
  const { error, _ } = editAlertValidation.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  next();
};
exports.validtaeCreateEducational = (req, res, next) => {
  const data = req.body;
  const { error, _ } = createEducationalValidation.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  next();
};
exports.validtaeEditEducational = (req, res, next) => {
  const data = req.body;
  const { error, _ } = editEducationalValidation.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  next();
};
exports.validtaeComment = (req, res, next) => {
  const data = req.body;
  const { error, _ } = commentValidation.validate(data);
  if (error) {
    return res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
  next();
};
