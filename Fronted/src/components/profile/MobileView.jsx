import React from 'react';
import { Link } from 'react-router-dom';

const MobileView = () => {
  return (
    <div className="flex lg:hidden flex-col gap-4 w-full bg-zinc-900 text-white p-6">
      <Link
        to="/profile"
        className="py-4 px-6 rounded bg-zinc-800 hover:bg-zinc-700 transition text-center text-2xl font-semibold"
      >
        Favourites
      </Link>

      <Link
        to="/profile/orderhistory"
        className="py-4 px-6 rounded bg-zinc-800 hover:bg-zinc-700 transition text-center text-2xl font-semibold"
      >
        Order History
      </Link>

      <Link
        to="/profile/settings"
        className="py-4 px-6 rounded bg-zinc-800 hover:bg-zinc-700 transition text-center text-2xl font-semibold"
      >
        Settings
      </Link>
    </div>
  );
};

export default MobileView;
