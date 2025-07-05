import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

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
    <div className="min-h-screen bg-zinc-900 p-8 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Book Image */}
        <div className="md:w-3/6 w-full">
          <img
            src={book.url}
            alt={book.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Book Details */}
        <div className="md:w-3/6 w-full flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-lg text-gray-300">By {book.author}</p>
          <p className="text-md text-gray-400">{book.description}</p>
          <p className="text-green-400 text-xl font-semibold">
            Price: ₹{book.price}
          </p>
          <p className="text-gray-400">Language: {book.language}</p>
        </div>
      </div>
    </div>
  );
}
