const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const today = new Date().toLocaleDateString("en-CA");

if (date > today) {
  return res.status(400).json({
    message: "Cannot mark attendance for future dates",
  });
}
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: date,
    });

    if (existingAttendance) {
      return res.status(409).json({
        message: "Attendance already marked for this date",
      });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      date: date,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const { date } = req.query;

    let filter = {
      employee: req.params.employeeId,
    };

    if (date) {
      filter.date = date;
    }

    const records = await Attendance.find(filter)
    .sort({ date: -1 })
    .populate("employee", "fullName email department");

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPresentCount = async (req, res) => {
  try {
    const count = await Attendance.countDocuments({
      employee: req.params.employeeId,
      status: "Present",
    });

    res.status(200).json({ presentDays: count });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};