import { useEffect, useState } from "react";
import axios from "axios";
import { Users, CheckCircle, XCircle } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setStats(res.data);
      setError("");
    } catch {
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {loading && (
        <div className="text-center py-6">
          Loading dashboard...
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {!loading && stats && (
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <Users className="text-blue-600 mb-3" />
            <p className="text-slate-500 text-sm">
              Total Employees
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {stats.totalEmployees}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <CheckCircle className="text-green-600 mb-3" />
            <p className="text-slate-500 text-sm">
              Present Today
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {stats.presentToday}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <XCircle className="text-red-600 mb-3" />
            <p className="text-slate-500 text-sm">
              Absent Today
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {stats.absentToday}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}