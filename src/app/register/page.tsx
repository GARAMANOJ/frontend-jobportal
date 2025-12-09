"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("candidate");

  const handleRegister = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
        role,
      }),
    });

    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://png.pngtree.com/thumb_back/fh260/background/20220305/pngtree-register-now-blue-banner-image_1066696.jpg)",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* FORM CONTAINER */}
      <div className="relative bg-gray-800/80 backdrop-blur-md p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <input
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600"
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-3 mb-6 rounded bg-gray-700 border border-gray-600"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
        >
          Register
        </button>
      </div>
    </div>
  );
}
