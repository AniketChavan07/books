import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <p className="text-xl">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 px-6 md:px-20 py-10 text-white">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left: Book Image */}
        <div className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-xl">
          <img
            src={book.url}
            alt={book.title}
            className="w-50px h-[450px] object-cover rounded-lg"
          />
        </div>

        {/* Right: Book Details */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {book.title}
          </h1>
          <p className="text-lg text-gray-300">by <span className="text-white font-medium">{book.author}</span></p>
          <p className="text-base text-gray-400 leading-relaxed">
            {book.description}
          </p>
          <p className="text-green-400 text-2xl font-semibold mt-4">
            ₹{book.price}
          </p>
          <p className="text-gray-400 text-sm">Language: {book.language}</p>
        </div>
      </div>
    </div>
  );
}
