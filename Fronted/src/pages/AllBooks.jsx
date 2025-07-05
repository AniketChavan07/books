import React from 'react'
import Loader from '../components/loader/Loader';
import Bookcard from '../components/BookCard/Bookcard';
import { useEffect, useState } from 'react';
import axios from 'axios';
function AllBooks() {
      const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/v1/get-book");
        console.log("Fetched books:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className='h-auto  px-12 py-8 bg-zinc-900'>
        <h4 className='text-3xl text-yellow-100 mb-4'>All Books</h4>
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


export default AllBooks
