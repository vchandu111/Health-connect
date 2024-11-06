import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicroscope,
  faUserMd,
  faClipboardCheck,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    icon: faMicroscope,
    title: "Advanced equipment",
    description:
      "State-of-the-art medical equipment for accurate diagnostics and treatment.",
  },
  {
    icon: faUserMd,
    title: "Qualified doctors",
    description:
      "Our team includes highly qualified and experienced medical professionals.",
  },
  {
    icon: faClipboardCheck,
    title: "Certified services",
    description:
      "All services are certified to ensure the highest quality standards.",
  },
  {
    icon: faHeartbeat,
    title: "Emergency care",
    description:
      "24/7 emergency services to provide urgent care when you need it most.",
  },
];

const Offer = () => {
  return (
    <div className="py-12  text-center">
      {/* Section Heading */}
      <h4 className="text-gray-500 uppercase text-sm mb-2">Why Choose Us?</h4>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
        Offer for You
      </h2>

      {/* Services Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-6"
          >
            {/* Icon */}
            <div className="text-red-400 text-5xl mb-4">
              <FontAwesomeIcon icon={service.icon} />
            </div>
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {service.title}
            </h3>
            {/* Description */}
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
