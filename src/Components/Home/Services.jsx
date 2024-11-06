import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faAmbulance,
  faBriefcaseMedical,
} from "@fortawesome/free-solid-svg-icons";

const ServiceSection = ({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="flex flex-col items-center p-10 text-center text-white transition duration-300">
      <div className="text-5xl mb-4">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className="font-semibold text-2xl mb-2">{title}</h3>
      <p className="mb-6 text-base">{description}</p>
      <a
        href={buttonLink}
        className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-red-500 transition duration-300"
      >
        {buttonText}
      </a>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
      {/* Hospitality Section */}
      <div className="bg-gradient-to-br from-red-500 to-red-400">
        <ServiceSection
          icon={faHospital}
          title="Hospitality"
          description="Clinical excellence must be the priority for any health care service provider."
          buttonText="Apply For A Bed"
          buttonLink="#"
        />
      </div>

      {/* Emergency Care Section */}
      <div className="bg-gradient-to-br from-red-500 to-red-400">
        <ServiceSection
          icon={faAmbulance}
          title="Emergency Care"
          description="Clinical excellence must be the priority for any health care service provider."
          buttonText="+10 672 356 3567"
          buttonLink="tel:+106723563567"
        />
      </div>

      {/* Chamber Service Section */}
      <div className="bg-gradient-to-br from-red-500 to-red-400">
        <ServiceSection
          icon={faBriefcaseMedical}
          title="Chamber Service"
          description="Clinical excellence must be the priority for any health care service provider."
          buttonText="Make An Appointment"
          buttonLink="/doctors"
        />
      </div>
    </div>
  );
};

export default ServicesSection;
