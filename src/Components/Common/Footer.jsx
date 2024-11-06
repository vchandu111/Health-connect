import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Newsletter */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-6">Health Connect</h1>
          <div className="flex mb-6">
            <input
              type="email"
              placeholder="Email"
              className="p-2 pl-4 w-full rounded-l-full bg-gray-800 text-gray-300 focus:outline-none border border-red-500"
            />
            <button className="px-4 py-2 bg-red-500 text-white rounded-r-full hover:bg-red-600 transition duration-300">
              SUBSCRIBE
            </button>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-red-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-red-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-red-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-red-500">
              <i className="fab fa-globe"></i>
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Company</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Departments
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Find a Doctor
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                News
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Facial Fillers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Breast Surgery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Body Lifts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Face & Neck
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Fat Reduction
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
              <span>Los Angeles Gournadi, 1230 Bariasl</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-phone mr-2 text-red-500"></i>
              <span>1-677-124-44227</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope mr-2 text-red-500"></i>
              <span>Support@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <span>&copy; 2024 All Rights Reserved</span>
        <span>This template is made with ❤️ by Health Connect</span>
        <span>Terms & Use • Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
