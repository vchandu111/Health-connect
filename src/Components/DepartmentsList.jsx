import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faUserMd,
  faTooth,
  faEye,
  faBrain,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Loader from './Common/Loader'; // Import the Loader component

const iconMapping = {
  faHeartPulse: faHeartPulse,
  faUserMd: faUserMd,
  faTooth: faTooth,
  faEye: faEye,
  faBrain: faBrain,
  faSyringe: faSyringe,
};

const AllDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://healthconnect-5ad96-default-rtdb.firebaseio.com/doctors.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const uniqueDepartments = Array.from(
          new Map(
            data.map((dept) => [
              dept.speciality.title,
              {
                title: dept.speciality.title,
                icon: iconMapping[dept.speciality.icon] || faUserMd,
              },
            ])
          ).values()
        );
        setDepartments(uniqueDepartments);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false)); // Hide loader after data is loaded
  }, []);

  const handleDepartmentClick = (title) => {
    navigate(`/doctors/${title}`);
  };

  return (
    <div className="py-12 bg-gray-50 relative mt-16">
      {/* Display loader if loading */}
          {loading && <Loader visible={loading} />}
          

      {/* Section Heading */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          All Available Departments
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          We provide a wide range of medical specialties to cater to your
          healthcare needs. Our departments are staffed by highly qualified
          professionals who are committed to providing exceptional care.
        </p>
      </div>

      {/* Departments Grid */}
      <div className="container w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {departments.map((department, index) => (
          <div
            key={index}
            onClick={() => handleDepartmentClick(department.title)}
            className="cursor-pointer flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            style={{
              background: "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
              color: "white",
            }}
          >
            <div className="text-white text-5xl mb-4">
              <FontAwesomeIcon icon={department.icon} />
            </div>
            <h3 className="text-lg font-bold text-white">{department.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDepartments;
