import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat, faPeopleCarry, faUserMd } from "@fortawesome/free-solid-svg-icons";
import Team from "./Home/Team";

const AboutUs = () => {
  return (
    <div className="container mx-auto py-12 px-6 mt-10">
      {/* Hero Section with Background Image */}
      <section
        className="text-center text-white py-16 rounded-lg shadow-md mb-12 transition duration-500 ease-in-out transform hover:scale-105"
        style={{
          backgroundImage: "url('https://preview.colorlib.com/theme/mediplus/images/bg_3.jpg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(220, 38, 38, 0.85)", // Red overlay with slight opacity
        }}
      >
        <h1 className="text-5xl font-bold mb-4 animate-fadeInDown">Welcome to Health Connect</h1>
        <p className="text-lg leading-relaxed mx-auto max-w-2xl">
          Connecting you with top healthcare professionals, compassionate care, and a healthier tomorrow.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="flex flex-col md:flex-row gap-8 items-center justify-center py-10">
        <div className="w-full md:w-1/2 p-6 bg-gray-100 rounded-lg shadow-md transition duration-500 ease-in-out hover:bg-gray-200 hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Health Connect, our mission is to bridge the gap between patients and healthcare providers, ensuring accessible, efficient, and high-quality medical services for everyone.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-6 bg-gray-100 rounded-lg shadow-md transition duration-500 ease-in-out hover:bg-gray-200 hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a world where healthcare is accessible to all, fostering a healthier, happier global community.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="text-center my-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2">
            <FontAwesomeIcon icon={faHeartbeat} className="text-red-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Compassion</h3>
            <p className="text-gray-600">
              We care deeply for our patients and treat them like family, providing a compassionate experience at every touchpoint.
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2">
            <FontAwesomeIcon icon={faPeopleCarry} className="text-red-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Collaboration</h3>
            <p className="text-gray-600">
              Working together with patients, doctors, and the community to achieve holistic health for everyone.
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-2">
            <FontAwesomeIcon icon={faUserMd} className="text-red-500 text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Excellence</h3>
            <p className="text-gray-600">
              Striving for excellence in every service, from routine checkups to complex procedures.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="my-16 text-center">
        <Team />
      </section>

      {/* Call to Action */}
      <section className="text-center mt-12">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">Ready to Connect with Us?</h3>
        <p className="text-gray-600 mb-6">We’re here to support your health journey. Reach out today!</p>
        <a
          href="/contact"
          className="px-8 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 shadow-md"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
