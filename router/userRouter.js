const express = require("express");
const {
  myAlerts,
  editMyAlerts,
  cancelMyAlerts,
} = require("../notification/notificationController");
const { addProfile, editProfile } = require("../user/userController");
const {
  addData,
  editData,
  deleteData,
} = require("../dataCollection/dataController");
const { dataMiddleWare } = require("../dataCollection/middleWare");
const {
  addRecource,
  getRecouces,
  getRecoucesByTitle,
  getRecoucesById,
  getRecoucesByCategory,
} = require("../educational/educationalController");
const {
  addComment,
  editComment,
  deleteComment,
  getComments,
} = require("../comments/commentsController");
const { commentMiddleWare } = require("../comments/midlleWare");
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
} = require("../validation/validate");
const router = express.Router();
router.post("/profile", validtaeAddUser, addProfile);
router.put("/profile/:userId", validtaeEditUser, editProfile);
// Alert Features
router.post("/alert/:userId", validtaeNewAlert, myAlerts);
router.put("/alert/:userId/:alertId", validtaeEditedAert, editMyAlerts);
router.delete("/alert/:userId/:alertId", cancelMyAlerts);
// resource Features
router.post("/rescourse", validtaeCreateEducational, addRecource);
router.get("/rescourses", getRecouces);
router.get("/getrecoucesbytitle/:title", getRecoucesByTitle);
router.get("/getrecoucesbyid/:id", getRecoucesById);
router.get("/getrecoucesbycategory/:category", getRecoucesByCategory);
// comment Features
router.post("/comment/:userId/:educationalId", addComment);
router.put(
  "/comment/:userId/:commentId",
  commentMiddleWare,
  validtaeComment,
  editComment
);
router.delete("/comment/:userId/:commentId", commentMiddleWare, deleteComment);
router.get("/comment/:educationalId", getComments);
//environmental Data features
router.post("/environmental/:userId", validtaeAddData, addData);
router.put(
  "/environmental/:userId/:dataId",
  dataMiddleWare,
  validtaeEditData,
  editData
);
router.delete("/environmental/:userId/:dataId", dataMiddleWare, deleteData);
module.exports = router;
