"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
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
        <Header />
        <Sidebar />
        
      </div>
 
      <div className="flex-1 p-6">
       <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">
  Pending Applications
</h2>

       <table className="w-full border-collapse border border-gray-200 bg-white shadow rounded-lg overflow-hidden">
  <thead className="bg-gray-100">
            <tr>
               <th className="border p-2">Name</th>
              <th className="border p-2">From_Date</th>
              <th className="border p-2">To_Date</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
             
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id} className="hover:bg-green-50 transition">
                <td className="border p-2">{app.name}</td>
                <td className="border p-2">{app.from_date}</td>
                <td className="border p-2">{app.to_date}</td>
                  <td className="border p-2">{app.reason}</td>
                                  <td className="border p-2">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                   className={`border rounded p-1 ${
    app.status === "Approved" ? "bg-green-100 text-green-700" :
    app.status === "Rejected" ? "bg-red-100 text-red-700" :
    "bg-yellow-100 text-yellow-700"
  }`}
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
