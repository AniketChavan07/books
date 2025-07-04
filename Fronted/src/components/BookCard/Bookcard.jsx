export default function Bookcard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md w-full max-w-xs">
      {/* Book image */}
      <img
        src={data.url}
        alt={data.title}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Book details */}
      <h2 className="text-xl font-bold mt-2">{data.title}</h2>
      <p className="text-gray-700">By {data.author}</p>
      <p className="text-gray-600 text-sm">{data.description}</p>
      <p className="text-green-600 font-semibold">₹{data.price}</p>
      <p className="text-gray-400 text-sm">{data.language}</p>
    </div>
  );
}
