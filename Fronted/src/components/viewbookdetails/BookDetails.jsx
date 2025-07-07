import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux"; // ✅ Import

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // ✅ Check login state

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/v1/get-book-id/${id}`)
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch book:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-800 text-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-zinc-900">
        <p>Book not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 px-4 md:px-16 py-12 text-white flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Book Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={book.url}
              alt={book.title}
              className="w-150px max-w-sm h-[400px] object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border-2 border-gray-700 hover:border-blue-500 duration-300"
            />
          </div>

          {/* Book Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
            <p className="text-lg text-gray-300">By {book.author}</p>
            <p className="text-md text-gray-400 leading-relaxed">{book.description}</p>
            <p className="text-green-400 text-xl font-semibold">Price: ₹{book.price}</p>
            <p className="text-gray-400">Language: {book.language}</p>

            {/* Show buttons only if user is logged in */}
            {isLoggedIn && (
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                  onClick={() => alert("Added to favorites")}
                >
                  <FaHeart /> Favorite
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                  onClick={() => alert("Added to cart")}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
