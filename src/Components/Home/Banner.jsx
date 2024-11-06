import React from "react";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center mt-10"
      style={{
        backgroundImage: `url('https://preview.colorlib.com/theme/medicalcenter/assets/img/hero/h1_hero.png.webp')`,
      }}
    >
      {/* Overlay with reduced opacity */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      <div className="relative container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="max-w-md md:max-w-lg p-4 sm:p-6 md:p-10 rounded-lg bg-opacity-80">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-wider leading-snug ">
            We care about your health
          </h1>
          <p className="text-sm sm:text-base md:text-lg  mt-4 md:mt-6 mb-6 md:mb-8">
            Also you dry creeping beast multiply fourth abundantly our itself
            signs bring our. Won form living.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-red-500 text-white font-semibold px-4 py-2 sm:py-3 rounded-md w-full sm:w-auto transition duration-300">
             <a href="/doctors">Make An Appointment</a> 
            </button>
            <button className="border border-red-500 text-red-500 font-semibold px-4 py-2 sm:py-3 rounded-md w-full sm:w-auto hover:bg-red-500 hover:text-white transition duration-300">
              <a href="/specializations">View Department</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
