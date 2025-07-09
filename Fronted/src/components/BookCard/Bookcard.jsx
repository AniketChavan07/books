import { Link } from "react-router-dom";

export default function Bookcard({ data, favourites, cart, onRemove }) {
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
      <p className="text-green-400 font-semibold mt-2">₹{data.price}</p>
      <p className="text-gray-500 text-sm">{data.language}</p>

      {/* View Details link */}
      <Link
        to={`/book/${data._id}`}
        className="mt-4 inline-block text-sm text-blue-400 hover:underline"
      >
        View Details
      </Link>

   {favourites && onRemove && (
  <div className="mt-3">
    <button
      onClick={() => onRemove(data._id)}
      className="text-sm px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
    >
      Remove from Favourites
    </button>
  </div>
)}

{cart && onRemove && (
  <div className="mt-3">
    <button
      onClick={() => onRemove(data._id)}
      className="text-sm px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
    >
      Remove from Cart
    </button>
  </div>
)}


 </div>
  );
}
