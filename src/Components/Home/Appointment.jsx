import React from "react";

const AppointmentBanner = () => {
  return (
    <div className="flex items-center justify-between bg-blue-500 rounded-xl mx-6 md:mx-0 my-10 p-8 md:p-12">
      {/* Text Section */}
      <div className="text-white space-y-4 md:w-1/2">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Book Appointment <br /> With 100+ Trusted Doctors
        </h2>
        <button className="flex items-center bg-white text-gray-700 font-semibold py-2 px-6 rounded-full mt-4 hover:bg-gray-200 transition duration-300">
          Create account
        </button>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex md:w-1/2 justify-end">
        <img
          src="https://prescripto.vercel.app/assets/appointment_img-DzbZlMsi.png"
          alt="Doctor"
          className="h-72 object-cover"
        />
      </div>
    </div>
  );
};

export default AppointmentBanner;
