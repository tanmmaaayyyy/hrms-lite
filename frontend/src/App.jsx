import { useState } from "react";
import { LayoutDashboard, Users, Calendar } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  const [page, setPage] = useState(
    localStorage.getItem("page") || "dashboard"
  );

  const handlePageChange = (value) => {
    setPage(value);
    localStorage.setItem("page", value);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      
      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">HRMS Lite</h1>

        <div className="space-y-2">

          <button
            onClick={() => handlePageChange("dashboard")}
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
              page === "dashboard"
                ? "bg-blue-600 shadow-lg shadow-blue-600/30"
                : "hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => handlePageChange("employees")}
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
              page === "employees"
                ? "bg-blue-600 shadow-lg shadow-blue-600/30"
                : "hover:bg-slate-800"
            }`}
          >
            <Users size={18} />
            Employees
          </button>

          <button
            onClick={() => handlePageChange("attendance")}
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
              page === "attendance"
                ? "bg-blue-600 shadow-lg shadow-blue-600/30"
                : "hover:bg-slate-800"
            }`}
          >
            <Calendar size={18} />
            Attendance
          </button>

        </div>

        <div className="mt-auto text-xs text-slate-400">
          © 2026 HRMS Lite
        </div>
      </div>

      <div className="flex-1 flex flex-col">

        <div className="bg-white border-b px-10 py-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-slate-800 capitalize">
            {page}
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              HRMS Admin Panel
            </span>

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-md">
              TS
            </div>
          </div>
        </div>

        <div className="p-12 overflow-auto">
          {page === "dashboard" && <Dashboard />}
          {page === "employees" && <Employees />}
          {page === "attendance" && <Attendance />}
        </div>

      </div>
    </div>
  );
}