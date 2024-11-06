import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserEmail) {
      setUserName(storedUserEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md flex items-center justify-between py-4 px-6 border-b border-gray-200">
      <div className="text-2xl font-bold tracking-wide text-black">
        <a href="/">Health Connect 🩺</a>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4 lg:space-x-8">
        <a href="/" className="text-gray-800 font-medium">HOME</a>
        <a href="/about" className="text-gray-800 font-medium hover:text-red-500">ABOUT</a>
        <a href="/specializations" className="text-gray-800 font-medium hover:text-red-500">Departments</a>
        <a href="/doctors" className="text-gray-800 font-medium hover:text-red-500">Doctors</a>
        <a href="/news" className="text-gray-800 font-medium hover:text-red-500">NEWS</a>
        <a href="/contact" className="text-gray-800 font-medium hover:text-red-500">CONTACT</a>
      </div>

      {/* User Profile Dropdown for Desktop */}
      {userName ? (
        <div className="relative hidden md:block z-10">
          <button
            className="flex items-center space-x-2 text-gray-800 focus:outline-none"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <FontAwesomeIcon icon={faUser} className="text-2xl text-red-600" />
            <span className="font-medium uppercase">{userName.split("@")[0]}</span>
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <a href="/appointments" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Appointments</a>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600">Logout</button>
            </div>
          )}
        </div>
      ) : (
        <button className="hidden md:block border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition duration-300">
          <a href="/signup">Signup</a>
        </button>
      )}

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-full left-0 right-0 bg-white shadow-lg md:hidden transition duration-300 ease-in-out`}
      >
        <a href="/" className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100">HOME</a>
        <a href="/about" className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100">ABOUT</a>
        <a href="/specializations" className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100">Departments</a>
        <a href="/doctors" className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100">Doctors</a>
        <a href="/news" className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100">NEWS</a>
        <a href="/contact" className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100">CONTACT</a>
        {userName ? (
          <>
            <a href="/appointments" className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100">My Appointments</a>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 font-medium">Logout</button>
          </>
        ) : (
          <a href="/signup" className="block px-4 py-2 border-t border-gray-200 text-red-500 font-medium hover:bg-red-50 hover:text-red-600 transition duration-300">Signup</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
