import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-[#1A237E] text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">DropHeaven</h1>
        </Link>
        <nav className="space-x-6 hidden md:block">
          <Link to="/professional-login" className="hover:underline">
            CA/CS Login
          </Link>
          <Link to="/customer-login" className="hover:underline">
            Customer Login
          </Link>
          <Link to="/company-login" className="hover:underline">
            Company Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
