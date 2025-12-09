import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 shadow bg-gray-900 text-white">
      <h2 className="text-xl font-bold">JobPortal</h2>

      <div className="flex gap-6 items-center">

        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>

        {/* User Applications Page */}
        {/* <Link href="/applications">My Applications</Link> */}

        {/* Debug Page */}
        <Link href="/applications/debug" className="text-yellow-400">
          Debug
        </Link>

      </div>
    </nav>
  );
}
