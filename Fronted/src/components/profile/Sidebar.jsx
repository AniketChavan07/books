import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ data }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center text-center w-full h-full ">
      {/* Profile Picture */}
      <img
        src={data.avatar}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-500"
      />

      {/* User Info */}
      <h2 className="mt-4 text-lg font-semibold">{data.name}</h2>
      <p className="text-sm text-gray-400 mb-4">{data.email}</p>

      {/* Navigation Links */}
      <hr className="w-full border-gray-700 my-6" />
      <div className="flex flex-col  w-full items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transition all  "
        >
          Favourites
        </Link>

        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transition all "
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transition all "
        >
          Settings
        </Link>
      </div>
      <button className="mt-6 bg-zinc-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all w-full">
        Log Out

      </button>
    </div>
  );
}

export default Sidebar;
