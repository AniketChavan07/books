import React, { useEffect, useState } from 'react';
import Loader from '../components/loader/Loader';
import Bookcard from '../components/BookCard/Bookcard';
import axios from 'axios';

function AllBooks() {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookclub-3msp.onrender.com/api/v1/get-book");
        console.log("Fetched books:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false); // ✅ make sure loading is updated after fetch
      }
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-800 text-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className='h-auto px-12 py-8 bg-zinc-900'>
      <h4 className='text-3xl text-yellow-100 mb-4'>All Books</h4>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4'>
        {Data.length > 0 ? (
          Data.map((book, i) => (
            <Bookcard key={i} data={book} />
          ))
        ) : (
          <p className="text-white text-lg">No books found.</p>
        )}
      </div>
    </div>
  );
}

export default AllBooks;
