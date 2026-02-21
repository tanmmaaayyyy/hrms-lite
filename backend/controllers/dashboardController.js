const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date().toLocaleDateString("en-CA");

    const totalEmployees = await Employee.countDocuments();

    const presentToday = await Attendance.countDocuments({
      date: today,
      status: "Present",
    });

    const absentToday = await Attendance.countDocuments({
      date: today,
      status: "Absent",
    });

    res.status(200).json({
      totalEmployees,
      presentToday,
      absentToday,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};