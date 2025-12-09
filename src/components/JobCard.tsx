export default function JobCard({ title, company, location }) {
  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md cursor-pointer">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-700">{company}</p>
      <p className="text-gray-500">{location}</p>
    </div>
  );
}
