import React from 'react';
import { Heart, ArrowRight, Calendar, Shield } from 'lucide-react';

const Banner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 overflow-hidden relative mt-16">
      <div className="container mx-auto h-full py-16">
        <div className="flex flex-col md:flex-row h-full items-center gap-16">
          {/* Left Content */}
          <div  className="w-full md:w-1/2 px-6 md:px-10 z-10 space-y-10">
            <div style={{width: 'fit-content'}}  className="flex w-auto items-center gap-3 mb-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all border border-red-100">
              <span className="text-red-500 animate-pulse mr-2"><Heart size={20} /></span>
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-bold">Trusted Healthcare Partner</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mt-10">
              <span className="text-red-900 block lg:text-7xl animate-fade-in-down">Your</span>
              <span className="bg-clip-text text-red-500 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 block">Health is</span>
              <span className="text-gray-900 block animate-fade-in-up mb-10">Our Priority</span>
            </h1>
            
            <p className="text-gray-700 text-xl leading-relaxed max-w-2xl">
              Experience personalized healthcare through our network of qualified professionals. 
              Your well-being is at the heart of everything we do.
            </p>

            <div className="flex flex-wrap gap-8 items-center">
              <button className="group bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-white text-lg rounded-full px-10 py-4 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 hover:brightness-110">
                Book Appointment
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
             
            </div>

            <div className="flex gap-12 pt-8">
              <div className="flex items-center gap-4 group hover:transform  shadow-md px-6 hover:scale-105 transition-all">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl group-hover:bg-blue-300 transition-colors  group-hover:shadow-lg">
                  <Calendar className="text-blue-600" size={28} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-md">24/7 Availability</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group shadow-md px-6 hover:transform hover:scale-105 transition-all">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl group-hover:bg-green-300 transition-colors  group-hover:shadow-lg">
                  <Shield className="text-green-600" size={28} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-md">100% Secure</p>
                </div>
              </div>
              
            </div>
            <button className="px-6 py-3 bg-red-500 text-white mt-16 font-semibold rounded-md text-2xl hover:bg-red-600 transition duration-300">
Register Now        </button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 relative h-full flex items-center justify-center">
            <div className="absolute right-0 w-full h-[120%] bg-gradient-to-bl from-blue-400/20 via-red-300/20 to-orange-200/20 rounded-l-full blur-3xl animate-pulse"></div>
            
            {/* Doctor image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img 
                src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"
                alt="Professional Doctor"
                className="object-contain h-[95%] rounded-2xl transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl hover:drop-shadow-[0_35px_35px_rgba(255,0,0,0.25)]"
              />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute bottom-10 -left-10 bg-gradient-to-br from-white/90 to-red-50/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-red-100">
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">500+</p>
                <p className="text-gray-700">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;