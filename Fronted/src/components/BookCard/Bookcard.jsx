import React from 'react'
import { Link } from 'react-router-dom';  // Importing Link from react-router-dom for navigation
function Bookcard({data}) {// passing data as props
    console.log(data);
  return (
    <div>
      <Link>
      <div className='bg-zinc-800 rounded p-4'>
        <div className='bg-zinc-900'>
          <img src="{data.url}" alt="/" />
        </div>
      </div>
      </Link>
    </div>
  )
}

export default Bookcard
