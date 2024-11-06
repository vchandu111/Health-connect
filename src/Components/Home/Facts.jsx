import React from "react";

const Facts = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat text-white py-20 px-6"
      style={{
        backgroundImage: `url('https://preview.colorlib.com/theme/mediplus/images/bg_3.jpg.webp')`,
      }}
    >
      {/* Overlay with reduced opacity */}
      <div className="absolute inset-0 bg-red-500 opacity-90"></div>

      <div className="relative z-10 container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Main Text */}
        <div className="text-center md:text-left space-y-4">
          <h4 className="uppercase text-sm text-white opacity-80"> Facts</h4>
          <h2 className="text-4xl md:text-5xl font-bold">
            Over 5,100 patients trust us
          </h2>
          <button className="mt-6 px-6 py-3 bg-white text-red-500 font-semibold rounded-full  transition duration-300">
           <a href="/doctors">Make an appointment</a> 
          </button>
        </div>

        {/* Right Section - Stats */}
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <span className="text-4xl font-bold">30</span>
            <p className="text-sm mt-2 opacity-80">Years of Experienced</p>
          </div>
          <div>
            <span className="text-4xl font-bold">4,500</span>
            <p className="text-sm mt-2 opacity-80">Happy Patients</p>
          </div>
          <div>
            <span className="text-4xl font-bold">84</span>
            <p className="text-sm mt-2 opacity-80">Number of Doctors</p>
          </div>
          <div>
            <span className="text-4xl font-bold">300</span>
            <p className="text-sm mt-2 opacity-80">Number of Staffs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facts;
