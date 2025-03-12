import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Common/Loader";

const DoctorsPage = () => {
  const { department: initialDepartment } = useParams(); // Read department from URL params
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    initialDepartment || "All"
  );
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://health-connect-fastapi-9qbw.vercel.app/doctors",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false); // Set loading to false when data is loaded

        // Set default filtered doctors based on initialDepartment from URL, if provided
        if (initialDepartment && initialDepartment !== "All") {
          const filtered = data.filter(
            (doctor) => doctor.speciality.title === initialDepartment
          );
          setFilteredDoctors(filtered);
        } else {
          setFilteredDoctors(data);
        }

        // Extract unique departments
        const uniqueDepartments = Array.from(
          new Set(data.map((doc) => doc.speciality.title))
        );
        setDepartments(["All", ...uniqueDepartments]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Hide loader on error as well
      });
  }, [initialDepartment]);

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    if (department === "All") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        (doctor) => doctor.speciality.title === department
      );
      setFilteredDoctors(filtered);
    }
    // Update the URL with the selected department
    navigate(`/doctors/${department}`);
  };

  const handleDoctorClick = (doctorId) => {
    // Navigate to the individual doctor detail page
    doctorId = doctorId - 1;
    navigate(`/appointment/${doctorId}`);
  };

  // Function to generate heading text
  const getHeadingText = () => {
    if (selectedDepartment === "All") {
      return "Browse through the doctors specialist.";
    }
    return (
      <>
        Browse through{" "}
        <span className="text-red-500 font-semibold">
          {selectedDepartment.toUpperCase()}
        </span>{" "}
        doctors near you.
      </>
    );
  };

  return (
    <div className="container mx-auto py-12 px-6 mt-16">
      {/* Show loader if loading */}
      {loading ? (
        <Loader visible={loading} />
      ) : (
        <>
          <h4 className="md:text-3xl text-2xl  font-bold text-gray-800 mb-8">
            {getHeadingText()}
          </h4>

          <div className="flex flex-col lg:flex-row">
            {/* Department Filter Sidebar for Desktop */}
            <div className="hidden lg:block lg:w-1/4 pr-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                {departments.map((department) => (
                  <button
                    key={department}
                    onClick={() => handleDepartmentClick(department)}
                    className={`block w-full text-left px-4 py-2 mb-4 rounded-lg ${
                      selectedDepartment === department
                        ? "bg-red-100 text-red-500 font-semibold"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {department}
                  </button>
                ))}
              </div>
            </div>

            {/* Department Filter Dropdown for Mobile */}
            <div className="block lg:hidden mb-4">
              <select
                onChange={(e) => handleDepartmentClick(e.target.value)}
                value={selectedDepartment}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctors Grid */}
            <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white p-6 rounded-lg shadow-md flex h-min flex-col items-center text-center cursor-pointer"
                  onClick={() => handleDoctorClick(doctor.id)} // Navigate on click
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <div className="font-semibold mb-2">
                    <ul className="list-none pl-4">
                      <li className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full animate-pulse ${
                            doctor.available ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ minWidth: "6px", minHeight: "6px" }} // Adjust bullet size here
                        ></span>
                        <span
                          className={`${
                            doctor.available ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {doctor.available ? "Available" : "Unavailable"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-500">{doctor.speciality.title}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorsPage;
