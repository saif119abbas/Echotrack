const express = require("express");
const {
  myAlerts,
  editMyAlerts,
  cancelMyAlerts,
} = require("../notification/controller");
const {
  validtaeNewAlert,
  validtaeEditedAert,
} = require("../validation/validate");
const router = express.Router();
router.post("createalert", validtaeNewAlert, myAlerts);
router.put("editalert/:id/:alertId", validtaeEditedAert, editMyAlerts);
router.delete("cancelalert/:id/:alertId", cancelMyAlerts);
module.exports = router;
