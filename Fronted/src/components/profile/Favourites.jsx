import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookcard from '../BookCard/Bookcard';

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookclub-3msp.onrender.com/api/v1/get-favourite-book", {
          headers,
        });
        setFavourites(response.data.favourites);
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
      }
    };
    fetch();
  }, []);

  const handleRemove = async (bookId) => {
    try {
      await axios.put(
        `https://bookclub-3msp.onrender.com/api/v1/delete-book-favourite`,
        {},
        {
          headers: {
            ...headers,
            bookid: bookId,
          },
        }
      );
      // Remove book from UI
      setFavourites(prev => prev.filter(book => book._id !== bookId));
    } catch (error) {
      console.error("Failed to remove from favourites:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-4 md:px-12 py-8">
      <h1 className="text-3xl text-white font-semibold mb-8 text-center border-b border-zinc-700 pb-4">
        Your Favourite Books
      </h1>

      {favourites.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {favourites.map((item, i) => (
            <Bookcard key={i} data={item} favourites onRemove={handleRemove} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg mt-20">
          No Favourite Books.
        </div>
      )}
    </div>
  );
}

export default Favourites;
