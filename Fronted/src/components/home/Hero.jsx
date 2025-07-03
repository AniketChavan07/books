import React from 'react';

function Hero() {
  return (
    <div className='h-[75vh] flex'>
      {/* Left Half */}
      <div className='w-3/6 flex flex-col justify-center px-10'>
        <h1 className='text-6xl font-semibold'>Discover Your Next Great Read</h1>
        <p className='mt-4 text-xl text-zinc-300'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique natus explicabo corrupti distinctio amet nesciunt
        </p>
          <div className='mt-6'>
             <button className='text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-3 w-fit rounded cursor-pointer transition-all duration-300 hover:bg-yellow-100 hover:text-black'>
          Discover Books
        </button>
          </div>
      </div>

      {/* Right Half */}
      <div className='w-3/6'>
        {/* Add image or illustration here if needed */}
      </div>
    </div>
  );
}

export default Hero;
