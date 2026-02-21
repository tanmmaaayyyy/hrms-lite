const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendanceByEmployee,
  getPresentCount,
} = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.get("/:employeeId/present-count", getPresentCount);
router.get("/:employeeId", getAttendanceByEmployee);

module.exports = router;