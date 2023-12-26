const express = require("express");
const {
  myAlerts,
  editMyAlerts,
  cancelMyAlerts,
  getMyAlerts,
  notify,
} = require("../controller/notificationController");
const {
  addProfile,
  editProfile,
  login,
  protect,
} = require("../controller/userController");
const {
  addData,
  editData,
  deleteData,
  getMyData,
} = require("../controller/dataController");
const { dataMiddleWare } = require("../MiddleWare/dataCollectionMiddleWare");
const {
  addComment,
  editComment,
  deleteComment,
} = require("../controller/commentsController");
const { commentMiddleWare } = require("../MiddleWare/commentMiddleWare");
const {
  validtaeNewAlert,
  validtaeEditedAert,
  validtaeEditEducational,
  validtaeComment,
  validtaeAddUser,
  validtaeEditUser,
  validtaeAddData,
  validtaeEditData,
  validtaeLogin,
} = require("../validation/validate");
const router = express.Router();
router.post("/login", validtaeLogin, login);
router.post("/profile", validtaeAddUser, addProfile);
router.put("/profile/:userId", protect, validtaeEditUser, editProfile);
// Alert Features
router.post("/alert/:userId", protect, validtaeNewAlert, myAlerts);
router.put(
  "/alert/:userId/:alertId",
  protect,
  validtaeEditedAert,
  editMyAlerts
);
router.get("/alert/:userId", protect, getMyAlerts);
router.delete("/alert/:userId/:alertId", protect, cancelMyAlerts);
router.post("/notify/:userId", protect, notify);

// comment Features
router.post("/comment/:userId/:educationalId", protect, addComment);
router.put(
  "/comment/:userId/:commentId",
  protect,
  commentMiddleWare,
  validtaeComment,
  editComment
);
router.delete(
  "/comment/:userId/:commentId",
  protect,
  commentMiddleWare,
  deleteComment
);
//environmental Data features
router.post("/environmental/:userId", protect, validtaeAddData, addData);
router.put(
  "/environmental/:userId/:dataId",
  protect,
  dataMiddleWare,
  validtaeEditData,
  editData
);
router.delete(
  "/environmental/:userId/:dataId",
  protect,
  dataMiddleWare,
  deleteData
);
router.get("/environmental/:userId", protect, getMyData);
module.exports = router;
