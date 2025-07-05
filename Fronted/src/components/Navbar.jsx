import React, { useState } from "react";
import { useSelector} from "react-redux"; // Corrected import from 'react-redux' to 'useSelectors'
// import { useDispatch } from "react-redux"; // Uncomment if you need to dispatch actions
// import { useSelector } from "react-redux";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/allbooks" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];
   const isLoggedIn= useSelector(state => state.auth.isLoggedIn);
   if(isLoggedIn==false){
    links.splice(2,2); // Remove Cart and Profile links if user is logged in
  } 
  // const role = useSelector((state) => state.auth.role);
  // const user = useSelector((state) => state.auth.user);
  return (
    <nav className="bg-zinc-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-10 me-3" src="/book.jpg" alt="logo" />
            <h1 className="text-2xl font-semibold">Bookclub</h1>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="hover:text-blue-500 transition duration-300"
              >
                {item.title}
              </a>
            ))}
            <a
              href="/login"
              className="px-3 py-1 border border-white rounded hover:text-blue-500 hover:border-blue-500 transition duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-3 py-1 border border-white rounded hover:text-blue-500 hover:border-blue-500 transition duration-300"
            >
              SignUp
            </a>
          </div>
        </div>

        {/* Mobile Links */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-screen mt-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            {links.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="hover:text-blue-400 transition-all duration-300"
              >
                {item.title}
              </a>
            ))}
            <a
              href="/login"
              className="px-3 py-1 border border-white rounded hover:text-blue-400 hover:border-blue-400 transition duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-3 py-1 border border-white rounded hover:text-blue-400 hover:border-blue-400 transition duration-300"
            >
              SignUp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
