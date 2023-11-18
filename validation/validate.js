const {
  createAlertValidation,
  editAlertValidation,
} = require("./alretValidation");
const {
  createEducationalValidation,
  editEducationalValidation,
} = require("./educationalValidation");
const { commentValidation } = require("./commentsValidation");
exports.validtaeNewAlert = (req, res, next) => {
  const data = req.body.data;
  const { error, _ } = createAlertValidation.validate(data);
  if (error) {
    return next(new AppError(error.message, 400));
  }
  next();
};
exports.validtaeEditedAert = (req, res, next) => {
  const data = req.body.data;
  const { error, _ } = editAlertValidation.validate(data);
  if (error) {
    return next(new AppError(error.message, 400));
  }
  next();
};
exports.validtaeCreateEducational = (req, res, next) => {
  const data = req.body.data;
  const { error, _ } = createEducationalValidation.validate(data);
  if (error) {
    return next(new AppError(error.message, 400));
  }
  next();
};
exports.validtaeEditEducational = (req, res, next) => {
  const data = req.body.data;
  const { error, _ } = editEducationalValidation.validate(data);
  if (error) {
    return next(new AppError(error.message, 400));
  }
  next();
};
exports.validtaeComment = (req, res, next) => {
  const data = req.body.data;
  const { error, _ } = commentValidation.validate(data);
  if (error) {
    return next(new AppError(error.message, 400));
  }
  next();
};
