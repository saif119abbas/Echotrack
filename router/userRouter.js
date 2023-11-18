const express = require("express");
const {
  myAlerts,
  editMyAlerts,
  cancelMyAlerts,
} = require("../notification/notificationController");
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
} = require("../validation/validate");
const router = express.Router();
// Alert Features
router.post("createalert/:userId", validtaeNewAlert, myAlerts);
router.put("editalert/:userId/:alertId", validtaeEditedAert, editMyAlerts);
router.delete("cancelalert/:userId/:alertId", cancelMyAlerts);
// resource Features
router.post("addresource", validtaeCreateEducational, addRecource);
router.get("getrecouces", getRecouces);
router.get("getrecoucesbytitle/:title", getRecoucesByTitle);
router.get("getrecoucesbyid/:id", getRecoucesById);
router.get("getrecoucesbycategory/:category", getRecoucesByCategory);
// comment Features
router.post("addcomment/:userId/:educationalId", addComment);
router.put(
  "editcomment/:userId/:commentId",
  commentMiddleWare,
  validtaeComment,
  editComment
);
router.delete(
  "deletecomment/:userId/:commentId",
  commentMiddleWare,
  validtaeComment,
  deleteComment
);
router.get("comments/:educationalId", getComments);
module.exports = router;
