import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start  py-12 px-6 md:px-16 mb-10 md:mb-20 mt-20">
      {/* Left Side - Images */}
      <div className="relative w-full md:w-1/2 mb-8 md:mb-0  justify-center md:flex hidden">
        <div className="relative">
          {/* Background Image */}
          <img
            src="https://preview.colorlib.com/theme/docmed/img/about/1.png"
            alt="Dentist performing a procedure"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {/* Foreground Image */}
          <img
            src="https://preview.colorlib.com/theme/docmed/img/about/2.png"
            alt="Doctor consulting with a patient"
            className="absolute top-10 left-20  h-auto transform translate-x-10 translate-y-10 rounded-lg shadow-lg border-4 border-white"
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
        <h4 className="text-red-500 font-semibold text-sm uppercase mb-2">
          Welcome to Health Connect
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Best Care For Your Good Health
        </h2>
        <p className="text-gray-600 mb-6">
          At Health Connect, we prioritize compassionate, personalized care that meets
          the unique needs of every patient. Our team of experienced
          professionals is committed to providing the highest quality medical
          services, ensuring you receive the best care possible.
        </p>

        {/* Checklist */}
        <ul className="space-y-3 mb-6 text-gray-600">
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-red-500 mr-3"
            />
            State-of-the-art medical facilities and equipment.
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-red-500 mr-3"
            />
            Experienced doctors and friendly, supportive staff.
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-red-500 mr-3"
            />
            Comprehensive care tailored to each patient’s needs.
          </li>
        </ul>

        {/* Button */}
        <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default About;
