const express = require("express");
const router = express.Router();
const {
  addRecource,
  getRecouces,
  getRecoucesByTitle,
  getRecoucesById,
  getRecoucesByCategory,
} = require("../controller/educationalController");
const { getComments } = require("../controller/commentsController");
const {
  curentWeather,
  forecast,
  globalalert,
} = require("../controller/externalAPIContorller");
const {
  getAllReports,
  getReportById,
} = require("../controller/reportController");
const { validtaeCreateEducational } = require("../validation/validate");
//Resource Frateures
router.post("/rescourse", validtaeCreateEducational, addRecource);
router.get("/rescourses", getRecouces);
router.get("/getrecoucesbytitle/:title", getRecoucesByTitle);
router.get("/getrecoucesbyid/:id", getRecoucesById);
router.get("/getrecoucesbycategory/:category", getRecoucesByCategory);
//Comment Features
router.get("/comment/:educationalId", getComments);
//External API
router.get("/cuurentweather", curentWeather);
router.get("/forecast", forecast);
router.get("/globalalert", globalalert);
//report feature
router.get("/report", getAllReports);
router.get("/report/:reportId", getReportById);

module.exports = router;
