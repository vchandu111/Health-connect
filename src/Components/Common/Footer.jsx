import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Departments", href: "/specializations" },
    { name: "Find a Doctor", href: "/doctors" },
    { name: "News", href: "/news" },
  ];

  const quickLinks = [
    { name: "Health Checkups", href: "#" },
    { name: "Vaccinations", href: "#" },
    { name: "Emergency Services", href: "/doctors" },
    { name: "Mental Health", href: "#" },
    { name: "Nutrition & Diet", href: "#" },
  ];

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      color: "text-red-500",
      text: "1234 Health Street, Sector 42, Gurgaon, Haryana, India",
    },
    {
      icon: "fas fa-phone",
      color: "text-red-500",
      text: "+91-98765-43210",
    },
    {
      icon: "fas fa-envelope",
      color: "text-red-500",
      text: "support@healthconnect.in",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and Newsletter */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FontAwesomeIcon
              icon={faStethoscope}
              className="mr-2 text-red-500"
            />
            Health Connect
          </h1>{" "}
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
            {companyLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-white">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-white">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
          <ul className="space-y-4 text-gray-400">
            {contactInfo.map((info, index) => (
              <li key={index} className="flex items-center">
                <i className={`${info.icon} mr-2 text-red-500`}></i>
                <span>{info.text}</span>
              </li>
            ))}
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
