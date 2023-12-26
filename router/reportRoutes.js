const express = require("express");
const reportController = require('../controller/reportController');
const protect = require('../middleware/protect');

const router = express.Router();

// Route to add a new environmental report
router.post('/report', protect, reportController.addReport);

// Route to get all environmental reports
router.get('/reports', protect, reportController.getAllReports);

// Route to get a specific environmental report by ID
router.get('/report/:reportId', protect, reportController.getReportById);

// Route to update an environmental report
router.put('/report/:reportId', protect, reportController.updateReport);

// Route to delete an environmental report
router.delete('/report/:reportId', protect, reportController.deleteReport);

module.exports = router;
