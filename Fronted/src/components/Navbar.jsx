import React from 'react';

export default function Navbar() {
  const links = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "All Books", link: "/allbooks" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  return (
    <div className="flex bg-zinc-800 text-white px-8 py-2 justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img className="h-10 me-4" src="/book.jpg" alt="logo" />
        <h1 className="text-2xl font-semibold">Bookclub</h1>
      </div>

      {/* Nav links and Login button */}
      <div className="flex items-center gap-6">
        {/* Nav Links */}
        <div className="flex gap-6 items-center">
          {links.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="hover:text-blue-500 hover:underline transition-all duration-300"
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* Login Button */}
        <div className='flex gap-4 '>

        <a
          href="/login"
          className="px-2 py-1 border border-white rounded hover:text-blue-500 hover:border-blue-500 transition-all duration-300"
          >
          Login
        </a>
          <a
          href="/signup"
          className=" px-2 py-1 border border-white rounded hover:text-blue-500 hover:border-blue-500 transition-all duration-300"
          >
          SignUp
        </a>
          </div>
      </div>
    </div>
  );
}
