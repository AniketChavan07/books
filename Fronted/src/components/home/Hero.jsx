import React from 'react';

function Hero() {
  return (
    <div className='flex flex-col lg:flex-row h-auto lg:h-[75vh]'>
      {/* Left Half */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center px-6 py-10'>
        <h1 className='text-3xl md:text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
          Discover Your Next Great Read
        </h1>
        <p className='mt-4 text-base md:text-lg text-zinc-300 text-center lg:text-left'>
          Books are more than just ink on paper they are portals to other worlds, timeless teachers, and faithful companions. Whether you're diving into a thrilling mystery, wandering through ancient civilizations, or learning something entirely new, books have the power to inspire, educate, and transform.   
            </p>
        <div className='mt-6 flex justify-center lg:justify-start'>
          <button className='text-yellow-100 text-xl font-semibold border border-yellow-100 px-6 md:px-10 py-2 md:py-3 w-fit rounded cursor-pointer transition-all duration-300 hover:bg-yellow-100 hover:text-black border-yellow-500'>
            Discover Books
          </button>
        </div>
      </div>

      {/* Right Half */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-4 py-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuc_Ipdm9OASnhQ2r_-P5_e7ZowsBqKseyBg&s"
          alt="hero"
          className="w-[280px] sm:w-[350px] md:w-[400px] h-auto object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}

export default Hero;
