import { useEffect, useState } from "react";
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

const iconMapping = {
  faHeartPulse: faHeartPulse,
  faUserMd: faUserMd,
  faTooth: faTooth,
  faEye: faEye,
  faBrain: faBrain,
  faSyringe: faSyringe,
};

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://backend-health-connect.vercel.app/doctors/department",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const departmentsWithIcons = data.departments.map((dept) => ({
          title: dept.title,
          icon: iconMapping[dept.icon] || faUserMd,
        }));
        setDepartments(departmentsWithIcons);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDepartmentClick = (title) => {
    navigate(`/doctors/${title}`);
  };

  return (
    <div className="py-12 bg-gray-50 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Health connect popular Departments
      </h2>
      <p className="text-gray-500 mb-10 px-4">
        Discover the range of medical specialties that our expert team offers to
        ensure comprehensive health care services.
      </p>

      <div className="container mx-auto grid grid-cols-1 w-3/4 md:w-full sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-8">
        {departments.slice(0, 6).map((department, index) => (
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

      <div className="mt-10">
        <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition duration-300">
          <a href="/specializations">View More</a>
        </button>
      </div>
    </div>
  );
};

export default Department;
