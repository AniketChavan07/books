import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ data }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center text-center w-full h-full">
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
      <div className="flex flex-col gap-3 w-full mt-6 text-left">
        <Link
          to="/profile/favourites"
          className="text-white hover:text-blue-400 transition duration-200"
        >
        </Link>

        <Link
          to="/profile/orders"
          className="text-white hover:text-blue-400 transition duration-200"
        >
        </Link>

        <Link
          to="/profile/settings"
          className="text-white hover:text-blue-400 transition duration-200"
        >
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
