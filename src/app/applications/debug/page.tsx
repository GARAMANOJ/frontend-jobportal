"use client";

import { useEffect, useState } from "react";

export default function DebugApplicationsPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDebug() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://127.0.0.1:8000/api/applications/debug", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.detail || "Error loading debug data");
        } else {
          setDebugData(data);
        }

      } catch (err) {
        setError("Network Error: " + err);
      } finally {
        setLoading(false);
      }
    }

    loadDebug();
  }, []);

  if (loading)
    return <div className="p-10 text-white text-xl">Loading debug data…</div>;

  if (error)
    return (
      <div className="p-10 text-red-400 text-xl font-bold">
        {error}
      </div>
    );

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Debug: Applications Data</h1>

      {/* CURRENT USER */}
      <div className="p-4 mb-6 bg-gray-800 rounded border">
        <h2 className="text-xl font-bold mb-2">Current User</h2>
        <p><strong>ID:</strong> {debugData.current_user.id}</p>
        <p><strong>Email:</strong> {debugData.current_user.email}</p>
        <p><strong>Role:</strong> {debugData.current_user.role}</p>
      </div>

      {/* TOTAL APPLICATION COUNT */}
      <div className="p-4 mb-6 bg-gray-800 rounded border">
        <h2 className="text-xl font-bold mb-2">Total Applications in DB</h2>
        <p className="text-lg">{debugData.total_applications_in_db}</p>
      </div>

      {/* ALL APPLICATIONS */}
      <div className="p-4 mb-6 bg-gray-800 rounded border">
        <h2 className="text-xl font-bold mb-4">All Applications</h2>

        {debugData.all_applications.length === 0 ? (
          <p className="text-gray-400">No applications found.</p>
        ) : (
          <div className="space-y-4">
            {debugData.all_applications.map((app: any) => (
              <div key={app.id} className="p-3 bg-gray-700 rounded border">
                <p><strong>ID:</strong> {app.id}</p>
                <p><strong>Job ID:</strong> {app.job_id}</p>
                <p><strong>Candidate ID:</strong> {app.candidate_id}</p>
                <p><strong>Resume Path:</strong> {app.resume_path}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* USER APPLICATIONS */}
      <div className="p-4 mb-6 bg-gray-800 rounded border">
        <h2 className="text-xl font-bold mb-4">Your Applications</h2>

        {debugData.user_applications.length === 0 ? (
          <p className="text-gray-400">You have not applied for any jobs.</p>
        ) : (
          <div className="space-y-4">
            {debugData.user_applications.map((app: any) => (
              <div key={app.id} className="p-3 bg-gray-700 rounded border">
                <p><strong>ID:</strong> {app.id}</p>
                <p><strong>Job ID:</strong> {app.job_id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
