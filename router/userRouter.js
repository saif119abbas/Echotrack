const express = require("express");
const {
  myAlerts,
  editMyAlerts,
  cancelMyAlerts,
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
} = require("../controller/dataController");
const { dataMiddleWare } = require("../MiddleWare/dataCollectionMiddleWare");
const {
  addRecource,
  getRecouces,
  getRecoucesByTitle,
  getRecoucesById,
  getRecoucesByCategory,
} = require("../controller/educationalController");
const {
  addComment,
  editComment,
  deleteComment,
  getComments,
} = require("../controller/commentsController");
const { commentMiddleWare } = require("../MiddleWare/commentMiddleWare");
const {
  validtaeNewAlert,
  validtaeEditedAert,
  validtaeCreateEducational,
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
router.delete("/alert/:userId/:alertId", protect, cancelMyAlerts);
// resource Features
router.post("/rescourse", validtaeCreateEducational, addRecource);
router.get("/rescourses", getRecouces);
router.get("/getrecoucesbytitle/:title", getRecoucesByTitle);
router.get("/getrecoucesbyid/:id", getRecoucesById);
router.get("/getrecoucesbycategory/:category", getRecoucesByCategory);
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
router.get("/comment/:educationalId", getComments);
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
module.exports = router;
