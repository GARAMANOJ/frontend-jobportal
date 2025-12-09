"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("");
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  // Backend connection check
  useEffect(() => {
    fetch("http://127.0.0.1:8000/kumar")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend not connected"));
  }, []);

  // Fetch jobs
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs/", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch(() => setJobs([]));
  }, []);

  // Filter jobs based on search
  const filteredJobs = jobs.filter((job: any) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.description.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white p-10 bg-gray-900 min-h-screen">

      <h1 className="text-3xl font-bold mb-4">Welcome to JobPortal</h1>
      <h2 className="text-4xl font-extrabold mb-4 text-blue-500">Dream comes True</h2>


      {/* Backend message */}
      {/* <p className="text-green-400 mb-6">{message}</p> */}

<img
  src="https://she-jobs.com/assets/images/bg/homepagebanner.jpg"
  alt="Job Portal Banner"
  width="100"
  height="4000"
  className="w-full h-80 object-cover rounded-lg shadow-lg mb-8"
/>


      {/* SEARCH BAR */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search jobs by title, description, or location..."
          className="w-full md:w-1/2 p-3 rounded-lg bg-white text-black outline-none shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Latest Jobs</h2>

      {/* JOB LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-400">No matching jobs found.</p>
        ) : (
          filteredJobs.map((job: any) => (
            <div key={job.id} className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
              <p className="mb-2">{job.description}</p>

              <p className="text-gray-300 text-sm">📍 {job.location}</p>
              <p className="text-gray-300 text-sm">💰 {job.salary}</p>

              <Link
                href={`/apply/${job.id}`}
                className="text-blue-400 underline mt-4 inline-block"
              >
                Apply Now →
              </Link>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
