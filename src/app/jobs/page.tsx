"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <main className="p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-4">UPLOAD THE JOBS</h1>

        <div className="flex justify-center mb-6">
          <img
            src="https://www.sapphiresolutions.net/images/job_new_portfolio/job_portal_about.svg"
            alt="Upload Jobs"
            width="400"
            className="object-contain shadow-lg rounded-lg"
          />
        </div>

        {/* CREATE JOB BUTTON */}
        <div className="flex justify-center mb-10">
          <Link
            href="/jobs/create"
            className="px-5 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold text-white"
          >
            + Post New Job
          </Link>
        </div>

        {/* JOB LISTINGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 && (
            <p className="text-gray-500">No jobs available yet.</p>
          )}

          {jobs.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <p className="text-gray-500 mb-4">Location: {job.location}</p>

              {/* ✅ APPLY BUTTON HERE */}
              <Link href={`/apply/${job.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Apply
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
