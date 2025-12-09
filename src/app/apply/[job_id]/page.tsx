"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.job_id;

  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleApply = async () => {
    if (!resume) return alert("Please upload resume");0
    if (!token) return alert("Please login first");

    setLoading(true);

    try {
      const url = `http://127.0.0.1:8000/api/applications/apply/${jobId}`;
      const formData = new FormData();

      formData.append("cover_letter", coverLetter);
      formData.append("resume", resume);

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + (data.detail || JSON.stringify(data)));
        return;
      }

      alert("Application Submitted Successfully!");

      // 🔥 Redirect to Jobs page
      router.push("/applications/debug");
    } catch (err) {
      alert("Network Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Apply for Job #{jobId}</h1>

      <textarea
        className="w-full p-3 mb-4 bg-gray-800 border rounded"
        placeholder="Cover Letter..."
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
      />

      <input
        type="file"
        className="w-full p-3 mb-4 bg-gray-800 border rounded"
        onChange={(e) => setResume(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleApply}
        disabled={loading}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </div>
  );
}
