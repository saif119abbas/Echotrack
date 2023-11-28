const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { environmentalAlerts, environmentalData } = require("../models");
const { addDocument } = require("../handleFactory");

exports.myAlerts = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  const data = req.body;
  data.userUserId = id;
  return await addDocument(environmentalAlerts, data, res, next);
});
exports.notify = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const alerts = await environmentalAlerts.findAll({
    attributes: ["alertType", "threshold"],
    where: { userUserId: id },
  });
  for (let alert of alerts) {
    const dataCollection = await environmentalData.findAll({
      attributes: ["dataType", "value"],
      where: { userUserId: id },
    });
    if (
      alert.alertType === dataCollection.dataType &&
      dataCollection.value >= alert.threshold
    ) {
      const myData = {
        decription: `${alert.alertType} notification: the value of ${alert.alertType} is ${dataCollection.value} and your threshold is ${alert.threshold}`,
      };
      await notifications
        .create(myData)
        .then(() => {})
        .catch((err) => {
          return next(new AppError("An error occurred please try again", 500));
        });
    }
  }
});
exports.editMyAlerts = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  const alertId = req.params.alertId;
  const data = req.body;
  data.userUserId = id;
  environmentalAlerts
    .update(data, { where: { userUserId: id, alertId } })
    .then((count) => {
      if (count[0] === 1)
        return res.status(200).json({
          status: "success",
          message: "updated successfully",
        });
      else if (count[0] === 0)
        return res.status(404).json({
          status: "failure",
          message: "this alert not found",
        });
      else
        return res.status(403).json({
          status: "failure",
          message: "not allowed",
        });
    })
    .catch((err) => {
      return next(new AppError("An error occurred please try again", 500));
    });
});
exports.cancelMyAlerts = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  const alertId = req.params.alertId;
  const data = req.body;
  data.userUserId = id;
  environmentalAlerts
    .destroy(data, { where: { userUserId: id, alertId } })
    .then((count) => {
      if (count[0] === 1)
        return res.status(200).json({
          status: "success",
          message: "cancled successfully",
        });
      else if (count[0] === 0)
        return res.status(404).json({
          status: "failure",
          message: "this alert not found",
        });
      else
        return res.status(403).json({
          status: "failure",
          message: "not allowed",
        });
    })
    .catch((err) => {
      return next(new AppError("An error occurred please try again", 500));
    });
});
