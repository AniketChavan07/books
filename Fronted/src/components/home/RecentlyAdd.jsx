import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookcard from '../BookCard/Bookcard';
import Loader from '../loader/Loader';
// This component fetches and displays recently added books
// It uses axios to make a GET request to the backend API and displays the books in a grid layout
function RecentlyAdd() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookclub-3msp.onrender.com/api/v1/get-recent-book");
        console.log("Fetched books:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100 mb-4'>Recently Added Books</h4>
       {!Data &&
      <div className='flex justify-between items-center mb-4  '>
       <Loader/>{""}
      </div>
       }
       

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4'>
        {Data && Data.slice(0, 4).map((book, i) => (
          <Bookcard key={i} data={book} />
        ))}
      </div>
    </div>
  );
}

export default RecentlyAdd;
