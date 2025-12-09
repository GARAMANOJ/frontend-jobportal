"use client";

import { useState } from "react";

export default function CreateJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handleCreateJob = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must login as employer first");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          salary,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + JSON.stringify(data));
        return;
      }

      alert("Job created successfully!");
      window.location.href = "/"; // redirect to home or jobs
    } catch (error) {
      alert("Network error");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create Job</h1>

        <input
          placeholder="Job Title"
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Job Description"
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Location"
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600"
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Salary"
          className="w-full p-3 mb-6 rounded bg-gray-700 border border-gray-600"
          onChange={(e) => setSalary(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
          onClick={handleCreateJob}
        >
          Post Job
        </button>
      </div>
    </div>
  );
}
