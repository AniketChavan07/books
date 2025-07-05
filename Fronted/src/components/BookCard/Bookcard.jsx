import { Link } from "react-router-dom";

export default function Bookcard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-zinc-800 rounded-lg p-4 shadow-md w-full max-w-xs">
      {/* Book image */}
      <img
        src={data.url}
        alt={data.title}
        className="w-60px h-[25vh] object-cover rounded-md justify-center mx-auto mb-2"
      />

      {/* Book details */}
      <h2 className="text-xl text-white font-bold mt-2">{data.title}</h2>
      <p className="text-gray-300">By {data.author}</p>
      <p className="text-gray-400 text-sm mt-1">{data.description}</p>
      <p className="text-green-400 font-semibold mt-2">₹{data.price}</p>
      <p className="text-gray-500 text-sm">{data.language}</p>

      {/* View Details link */}
      <Link
        to={`/book/${data._id}`}
        className="mt-4 inline-block text-sm text-blue-400 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
