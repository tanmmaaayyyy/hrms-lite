import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const EMPLOYEE_API = `${BASE_URL}/api/employees`;
const ATTENDANCE_API = `${BASE_URL}/api/attendance`;

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [records, setRecords] = useState([]);
  const [presentCount, setPresentCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      loadAttendance();
    }
  }, [selectedEmployee]);

  const loadEmployees = async () => {
    try {
      const res = await axios.get(EMPLOYEE_API);
      setEmployees(res.data);
    } catch {
      setError("Unable to load employees.");
    }
  };

  const handleMarkAttendance = async () => {
    if (!selectedEmployee || !date) {
      setError("Please select employee and date.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(ATTENDANCE_API, {
        employeeId: selectedEmployee,
        date,
        status,
      });

      setError("");
      await loadAttendance();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to mark attendance."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async () => {
    if (!selectedEmployee) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${ATTENDANCE_API}/${selectedEmployee}`
      );
      setRecords(res.data);

      const countRes = await axios.get(
        `${ATTENDANCE_API}/${selectedEmployee}/present-count`
      );
      setPresentCount(countRes.data.presentDays);

      setError("");
    } catch {
      setError("Unable to load attendance records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-6">
          Mark Attendance
        </h3>

        <div className="grid grid-cols-4 gap-4">
          <select
            className="border p-2 rounded-lg"
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(e.target.value)
            }
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName} ({emp.employeeId})
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-2 rounded-lg"
            value={date}
            max={new Date().toLocaleDateString("en-CA")}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="border p-2 rounded-lg"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button
            onClick={handleMarkAttendance}
            className="bg-blue-600 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-semibold">
            Attendance Records
          </h3>

          <button
            onClick={loadAttendance}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg"
          >
            Load Records
          </button>
        </div>

        <p className="mb-4">
          Total Present Days: <strong>{presentCount}</strong>
        </p>

        {loading && (
          <div className="text-center py-4">
            Loading records...
          </div>
        )}

        {!loading && records.length === 0 && (
          <div className="text-slate-500">
            No attendance records found.
          </div>
        )}

        {!loading && records.length > 0 && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-500 text-sm">
                <th className="py-3">Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr
                  key={rec._id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="py-3">
                    {new Date(rec.date).toLocaleDateString()}
                  </td>
                  <td>{rec.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}