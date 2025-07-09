import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
function Favourites() {
  const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  useEffect(()=>{
 const fetch = async()=>{
  const response = await axios.get("http://localhost:3002/api/v1/get-favourite-book",
    {headers}
  );
  console.log(response.data);
 };
 fetch();
  },[])
  return (
    <div>
      Favourites
    </div>
  )
}

export default Favourites
