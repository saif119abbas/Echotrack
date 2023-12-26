const express = require("express");
const reportController = require("../controller/reportController");
const { protect } = require("../controller/userController");

const router = express.Router();

// Route to add a new environmental report
router.post("/report/:userId", protect, reportController.addReport);

// Route to get a specific environmental report by ID
router.get("/report/:reportId", reportController.getReportById);

// Route to update an environmental report
router.put("/report/:userId/:reportId", protect, reportController.updateReport);

// Route to delete an environmental report
router.delete(
  "/report/:userId/:reportId",
  protect,
  reportController.deleteReport
);

module.exports = router;
