const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Employee.findOne({
      $or: [{ employeeId }, { email }],
    });

    if (existing) {
      return res.status(409).json({ message: "Employee already exists" });
    }

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Employee
const mongoose = require("mongoose");

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await Employee.findByIdAndDelete(employeeId);

    await Attendance.deleteMany({
      employee: new mongoose.Types.ObjectId(employeeId),
    });

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};