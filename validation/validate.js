const {
  createAlertValidation,
  editAlertValidation,
} = require("./alretValidation");
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
