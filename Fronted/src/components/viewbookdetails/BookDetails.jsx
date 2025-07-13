import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaShoppingCart, FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.role);
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

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

  const handleAddToFavorites = async () => {
    try {
      const headers = {
        id: userId,
        bookid: id,
        authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `http://localhost:3002/api/v1/add-book-favourite`,
        {},
        { headers }
      );

      if (response.data.message.includes("already")) {
        alert("Book is already in favorites");
      } else {
        alert("Book added to favorites!");
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites.");
    }
  };

  const handleAddToCart = async () => {
    try {
      const headers = {
        id: userId,
        bookid: id,
        authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `http://localhost:3002/api/v1/add-book-cart`,
        {},
        { headers }
      );

      if (response.data.message.includes("already")) {
        alert("Book is already in cart");
      } else {
        alert("Book added to cart!");
        setIsInCart(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  const handleDelete = async () => {
    try {
      const headers = {
        authorization: `Bearer ${token}`,
        bookid: id,
      };

      const response = await axios.delete(
        `http://localhost:3002/api/v1/delete-book`,
        { headers }
      );

      alert(response.data.message);
      navigate("/allbooks");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book.");
    }
  };

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
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src={book.url}
              alt={book.title}
              className="w-150px max-w-sm h-[400px] object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border-2 border-gray-700 hover:border-blue-500 duration-300"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
            <p className="text-lg text-gray-300">By {book.author}</p>
            <p className="text-md text-gray-400 leading-relaxed">{book.description}</p>
            <p className="text-green-400 text-xl font-semibold">Price: ₹{book.price}</p>
            <p className="text-gray-400">Language: {book.language}</p>

            {isLoggedIn && (
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                  onClick={handleAddToFavorites}
                  disabled={isFavorite}
                >
                  <FaHeart /> {isFavorite ? "Favorited" : "Favorite"}
                </button>

                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                  onClick={handleAddToCart}
                  disabled={isInCart}
                >
                  <FaShoppingCart /> {isInCart ? "Added" : "Add to Cart"}
                </button>
              </div>
            )}

            {userRole === "admin" && (
              <div className="flex gap-4 mt-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition"
                  onClick={() => navigate(`/updatebook/${id}`)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-800 hover:bg-red-900 text-white rounded transition"
                  onClick={handleDelete}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
