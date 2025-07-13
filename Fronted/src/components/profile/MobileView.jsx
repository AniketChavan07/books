import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileView = () => {
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) return null; // Guest users see nothing

  return (
    <div className="flex lg:hidden flex-col gap-4 w-full bg-zinc-900 text-white p-6">
      {role === 'user' && (
        <>
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
        </>
      )}

      {role === 'admin' && (
        <>
          <Link
            to="/profile/add-book"
            className="py-4 px-6 rounded bg-zinc-800 hover:bg-zinc-700 transition text-center text-2xl font-semibold"
          >
            Add Book
          </Link>

          <Link
            to="/profile/all-order"
            className="py-4 px-6 rounded bg-zinc-800 hover:bg-zinc-700 transition text-center text-2xl font-semibold"
          >
            All Orders
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileView;
