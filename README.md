🚀 Job Portal — Frontend (Next.js + Tailwind CSS)

This is the frontend for the Job Portal Application, built using Next.js (App Router) and styled with Tailwind CSS.
Users can:

🔐 Register & Login

👀 View Jobs

📥 Apply for Jobs with Resume Upload

📄 View Their Applications

🐞 (Dev Only) Debug Application Data

Backend: FastAPI
Database: PostgreSQL

⚙️ Getting Started

First, install dependencies:

npm install
# or
yarn
# or
pnpm install


Run the development server:

npm run dev
# or: yarn dev / pnpm dev / bun dev


Open your browser and visit:

👉 http://localhost:3000

The app will auto-refresh as you edit files.

📁 Project Structure
src/app/
 ├── page.tsx                  → Home
 ├── jobs/                     → Jobs List
 ├── apply/[job_id]/page.tsx  → Apply Page
 ├── applications/page.tsx     → My Applications
 ├── applications/debug/       → Debug view (dev)
 ├── login/page.tsx            → Login
 ├── register/page.tsx         → Register
 └── layout.tsx                → Global Layout + Navbar

🔗 Environment Variables

Create .env.local:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000


Make sure your FastAPI backend is running on the same URL.

🧪 API Endpoints Used
Authentication
POST /api/auth/register
POST /api/auth/token

Jobs
GET /api/jobs

Applications
POST /api/applications/apply/{job_id}
GET  /api/applications/my
GET  /api/applications/debug     ← Dev only

🎨 Tech Stack

Next.js 14 (App Router)

React

Tailwind CSS

FastAPI Backend

PostgreSQL

JWT Authentication

🧑‍💻 Development Notes

app/layout.tsx contains the global layout + navbar.

app/apply/[job_id]/page.tsx handles applying for a job.

File uploads must use FormData.

Token is stored in localStorage.

🚀 Deploy on Vercel

Deploy easily using:

👉 https://vercel.com/new

Or follow the official docs:

https://nextjs.org/docs/app/building-your-application/deploying

🤝 Contributing

Fork the repo

Create a branch

Commit changes

Open a Pull Request
