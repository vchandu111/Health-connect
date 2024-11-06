import React, { useEffect, useState, useRef } from "react";

const Facts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const factsRef = useRef(null);

  const factsData = [
    { label: "Years of Experience", endValue: 30 },
    { label: "Happy Patients", endValue: 500 },
    { label: "Number of Doctors", endValue: 84 },
    { label: "Number of Staff", endValue: 300 },
  ];

  // Setting up intersection observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (factsRef.current) {
      observer.observe(factsRef.current);
    }

    return () => {
      if (factsRef.current) observer.unobserve(factsRef.current);
    };
  }, []);

  // Function to animate count-up for each stat
  const animateCount = (start, end) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      if (isVisible) {
        const duration = 2000; // Animation duration in ms
        const stepTime = Math.abs(Math.floor(duration / end));

        const timer = setInterval(() => {
          setCount((prev) => {
            const next = prev + 1;
            if (next >= end) {
              clearInterval(timer);
              return end;
            }
            return next;
          });
        }, stepTime);

        return () => clearInterval(timer);
      }
    }, [isVisible, end]);

    return count;
  };

  return (
    <div
      ref={factsRef}
      className="relative bg-cover bg-center bg-no-repeat text-white py-20 px-6"
      style={{
        backgroundImage: `url('https://preview.colorlib.com/theme/mediplus/images/bg_3.jpg.webp')`,
      }}
    >
      <div className="absolute inset-0 bg-red-500 opacity-90"></div>

      <div className="relative z-10 container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Main Text */}
        <div className="text-center md:text-left space-y-4">
          <h4 className="uppercase text-sm text-white opacity-80">Facts</h4>
          <h2 className="text-4xl md:text-5xl font-bold">
            Over 5,100 patients trust us
          </h2>
          <button className="mt-6 px-6 py-3 bg-white text-red-500 font-semibold rounded-full transition duration-300">
            <a href="/doctors">Make an appointment</a>
          </button>
        </div>

        {/* Right Section - Stats */}
        <div className="grid grid-cols-2 gap-8 text-center">
          {factsData.map((fact, index) => (
            <div key={index}>
              <span className="text-4xl font-bold">
                {animateCount(0, fact.endValue)}
              </span>
              <p className="text-sm mt-2 opacity-80">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facts;
