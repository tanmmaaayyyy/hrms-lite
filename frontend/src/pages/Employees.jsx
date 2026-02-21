import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const EMPLOYEE_API = `${BASE_URL}/api/employees`;
const ATTENDANCE_API = `${BASE_URL}/api/attendance`;

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [presentCounts, setPresentCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(EMPLOYEE_API);
      setEmployees(res.data);
      await loadPresentCounts(res.data);
      setError("");
    } catch {
      setError("Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  const loadPresentCounts = async (employeeList) => {
    const counts = {};

    for (let emp of employeeList) {
      try {
        const res = await axios.get(
          `${ATTENDANCE_API}/${emp._id}/present-count`
        );
        counts[emp._id] = res.data.presentDays;
      } catch {
        counts[emp._id] = 0;
      }
    }

    setPresentCounts(counts);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(EMPLOYEE_API, formData);

      setFormData({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });

      await loadEmployees();
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add employee."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${EMPLOYEE_API}/${id}`);
      await loadEmployees();
      setError("");
    } catch {
      setError("Failed to delete employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-6">
          Add Employee
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-4 gap-4"
        >
          <input
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            className="border p-2 rounded-lg"
            required
          />

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded-lg"
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border p-2 rounded-lg"
            required
          />

          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="border p-2 rounded-lg"
            required
          />

          <button
            type="submit"
            className="col-span-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Add Employee"}
          </button>
        </form>

        {error && (
          <div className="mt-4 bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-6">
          Employee List
        </h3>

        {loading && (
          <div className="text-center py-6">
            Loading employees...
          </div>
        )}

        {!loading && employees.length === 0 && (
          <div className="text-center text-slate-500 py-6">
            No employees available.
          </div>
        )}

        {!loading && employees.length > 0 && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-500 text-sm">
                <th className="py-3">Employee ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Present Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee._id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="py-3">
                    {employee.employeeId}
                  </td>
                  <td>{employee.fullName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    {presentCounts[employee._id] || 0}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleDelete(employee._id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}