"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function PendingApplication() {
  const [applications, setApplications] = useState([
    { id: 1, name: "Rahul Sharma", from: "2026-04-20", to: "2026-04-22", status: "Pending" },
    { id: 2, name: "Priya Singh", from: "2026-04-25", to: "2026-04-28", status: "Pending" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed width */}
      <div className="w-64 bg-gray-100 border-r">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Pending Applications</h2>
        <table className="w-full border-collapse border border-gray-300 bg-white shadow">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td className="border p-2">{app.id}</td>
                <td className="border p-2">{app.name}</td>
                <td className="border p-2">{app.from}</td>
                <td className="border p-2">{app.to}</td>
                <td className="border p-2">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
