"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "@/lib/supabase";

export default function PendingApplication() {
  const [applications, setApplications] = useState([]);

  // Fetch applications from Supabase
  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from("leaves")  
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching applications:", error);
      } else {
        setApplications(data);
      }
    };

    fetchApplications();
  }, []);

  // Update status in Supabase
  const handleStatusChange = async (id, newStatus) => {
    const { data, error } = await supabase
      .from("leaves")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      setApplications(applications.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      ));
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-100 border-r">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Pending Applications</h2>
        <table className="w-full border-collapse border border-blue-300 bg-white shadow">
          <thead>
            <tr>
               <th className="border p-2">name</th>
              <th className="border p-2">from_date</th>
              <th className="border p-2">to_date</th>
              <th className="border p-2">reason</th>
              <th className="border p-2">status</th>
             
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td className="border p-2">{app.name}</td>
                <td className="border p-2">{app.from_date}</td>
                <td className="border p-2">{app.to_date}</td>
                  <td className="border p-2">{app.reason}</td>
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
