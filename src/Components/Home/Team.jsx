import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Doctor Image */}
      <div className="relative w-48 h-48 mb-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
        />
      </div>
      {/* Doctor Name and Title */}
      <h3 className="text-lg font-bold text-red-500">{doctor.name}</h3>
      <p className="text-gray-500 mb-4">{doctor.speciality.title}</p>
      {/* Social Icons */}
      <div className="flex space-x-4 text-gray-500">
        <a href="#" className="hover:text-red-500">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="#" className="hover:text-red-500">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="hover:text-red-500">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" className="hover:text-red-500">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
    </div>
  );
};

const Team = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate(); // for redirection

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/doctors", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data); // Store all doctors data
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleViewMore = () => {
    navigate("/doctors"); // Redirect to the full doctors page
  };

  return (
    <div className="py-12 text-center">
      {/* Section Heading */}
      <h4 className="text-gray-500 uppercase text-sm mb-2">Our Team</h4>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
        Our Expert Doctors
      </h2>
      {/* Doctors Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {doctors.slice(0, 4).map(
          (
            doctor,
            index // Show only the first 4 doctors
          ) => (
            <DoctorCard key={index} doctor={doctor} />
          )
        )}
      </div>
      {/* View More Button */}
      <div className="mt-8">
        <button
          onClick={handleViewMore}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default Team;
