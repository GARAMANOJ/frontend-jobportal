"use client";

import { useEffect, useState } from "react";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://127.0.0.1:8000/api/applications/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Error loading applications");
      } else {
        // Normalize response to always be an array
        const apps = Array.isArray(data)
          ? data
          : data.applications
          ? data.applications
          : [];

        setApplications(apps);
      }

      setLoading(false);
    } catch (err) {
      setError("Network error: " + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading applications...</p>}

      {/* Error */}
      {error && (
        <p className="text-red-400 font-bold mb-4">
          {error}
        </p>
      )}

      {/* No Applications */}
      {!loading && applications.length === 0 && (
        <p className="text-gray-400">You have not applied for any jobs.</p>
      )}

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app: any) => (
          <div
            key={app.id}
            className="p-4 bg-gray-800 border rounded shadow"
          >
            <p><strong>Application ID:</strong> {app.id}</p>
            <p><strong>Job ID:</strong> {app.job_id}</p>
            <p><strong>Cover Letter:</strong> {app.cover_letter}</p>
            <p><strong>Resume Path:</strong> {app.resume_path}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
