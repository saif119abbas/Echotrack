const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Op, literal } = require("sequelize");
const notifier = require("node-notifier");
const {
  environmentalAlerts,
  environmentalData,
  notifications,
} = require("../models");
const {
  addDocument,
  updateDocument,
  deleteDocument,
} = require("../handleFactory");

exports.myAlerts = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const data = req.body;
  data.userUserId = id;
  return await addDocument(environmentalAlerts, data, res);
});
exports.notify = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  const alerts = await new Promise((resolve) => {
    environmentalAlerts
      .findAll({
        attributes: ["alertType", "threshold"],
        where: { userUserId: id },
      })
      .then((record) => {
        resolve(record);
      });
  });
  console.log("alerts", alerts);
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  /*const dataCollection = await new Promise((resolve) => {
    environmentalData
      .findAll({
        attributes: ["dataType", "value"],
        where: {
          createdAt: {
            [Op.gte]: currentDate,
            [Op.lt]: nextDate,
          },
        },
      })
      .then((record) => {
        resolve(record);
      });
  });*/

  for (let alert of alerts) {
    const dataItem = await new Promise((resolve) => {
      environmentalData
        .findOne({
          attributes: ["dataType", "value"],
          where: {
            createdAt: {
              [Op.gte]: currentDate,
              [Op.lt]: nextDate,
            },
            //  userUserId: id, // Assuming userUserId is a field in environmentalData table
            //  dataType: alert.alertType, // Match the specific dataType from the alert
          },
        })
        .then((record) => {
          resolve(record);
        });
    });
    console.log(dataItem);
    if (
      alert.alertType === dataItem.dataType &&
      dataItem.value !== alert.threshold
    ) {
      const myData = {
        decription: `${alert.alertType} notification: the value of ${alert.alertType} is ${dataItem.value} and your threshold is ${alert.threshold}`,
        userUserId: id,
      };
      await sendNotification(`consider ${alert.alertType}`, myData.decription);
      await notifications.create(myData);
    }
  }
  res.status(200).json({
    message: "notification sent successfully",
  });
});
async function sendNotification(title, message) {
  return new Promise((resolve, reject) => {
    const notificationOptions = {
      title: title || "Default Title",
      message: message || "Default Message",
    };

    // Show the notification
    notifier.notify(notificationOptions, (err, response) => {
      if (err) {
        console.error("Error sending notification:", err);
        reject(err);
      } else {
        console.log("Notification sent successfully:", response);
        resolve(response);
      }
    });
  });
}
exports.editMyAlerts = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const alertId = req.params.alertId;
  const data = req.body;
  data.userUserId = id;
  const condition = {
    userUserId: id,
    alertId,
  };
  return await updateDocument(environmentalAlerts, data, condition, res);
});
exports.cancelMyAlerts = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  const alertId = req.params.alertId;
  const data = req.body;
  data.userUserId = id;
  const condition = { userUserId: id, alertId };
  return await deleteDocument(environmentalAlerts, condition, res);
});
exports.getMyAlerts = catchAsync(async (req, res) => {
  const userUserId = req.params.userId;
  const data = await new Promise((resolve) => {
    environmentalAlerts
      .findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          userUserId,
        },
      })
      .then((record) => {
        resolve(record);
      });
  });
  res.status(200).json({ data });
});
