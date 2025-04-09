import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faUserMd,
  faTooth,
  faEye,
  faBrain,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./Common/Loader";

const iconMapping = {
  faHeartPulse: faHeartPulse,
  faUserMd: faUserMd,
  faTooth: faTooth,
  faEye: faEye,
  faBrain: faBrain,
  faSyringe: faSyringe,
};

const DoctorsPage = () => {
  const navigate = useNavigate();
  const { department: initialDepartment } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    initialDepartment || "All"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch doctors
        const doctorsResponse = await fetch(
          "https://backend-health-connect.vercel.app/doctors"
        );
        const doctorsData = await doctorsResponse.json();
        setDoctors(doctorsData);

        // Set filtered doctors based on initial department
        if (initialDepartment && initialDepartment !== "All") {
          const deptResponse = await fetch(
            `https://backend-health-connect.vercel.app/doctors/department/${initialDepartment.toLowerCase()}`
          );
          const deptData = await deptResponse.json();
          setFilteredDoctors(deptData);
        } else {
          setFilteredDoctors(doctorsData);
        }

        // Fetch departments
        const deptResponse = await fetch(
          "https://backend-health-connect.vercel.app/doctors/department"
        );
        const deptData = await deptResponse.json();
        setDepartments(["All", ...deptData.departments]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialDepartment]);

  const handleDepartmentClick = async (department) => {
    setSelectedDepartment(department);
    try {
      setLoading(true);
      if (department === "All") {
        setFilteredDoctors(doctors);
      } else {
        const response = await fetch(
          `https://backend-health-connect.vercel.app/doctors/department/${department.toLowerCase()}`
        );
        const data = await response.json();
        setFilteredDoctors(data);
      }
    } catch (error) {
      console.error("Error filtering doctors:", error);
    } finally {
      setLoading(false);
    }
    navigate(`/doctors/${department}`);
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };

  const getHeadingText = () => {
    if (selectedDepartment === "All" || !selectedDepartment) {
      return "Browse through all doctors specialist.";
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-12 px-6 mt-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-500 mb-4">
              Filter by Departments
            </h3>
            <div className="space-y-2">
              {departments.map((department) => (
                <div
                  key={
                    typeof department === "string"
                      ? department
                      : department.title
                  }
                  onClick={() =>
                    handleDepartmentClick(
                      typeof department === "string"
                        ? department
                        : department.title
                    )
                  }
                  className={`flex cursor-pointer items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedDepartment ===
                    (typeof department === "string"
                      ? department
                      : department.title)
                      ? "bg-red-500 text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {typeof department === "string" ? (
                    <span className="text-gray-700">{department}</span>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={iconMapping[department.icon]}
                        className={`text-lg mr-2 ${
                          selectedDepartment === department.title
                            ? "text-white"
                            : "text-black-600"
                        }`}
                      />
                      <span
                        className={
                          selectedDepartment === department.title
                            ? "text-white"
                            : "text-gray-700"
                        }
                      >
                        {department.title}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <h4 className="md:text-3xl text-2xl font-bold text-gray-800 mb-8">
            {getHeadingText()}
          </h4>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-6 rounded-lg shadow-md flex h-min flex-col items-center text-center cursor-pointer"
                onClick={() => handleDoctorClick(doctor.id)}
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
                        style={{ minWidth: "6px", minHeight: "6px" }}
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
      </div>
    </div>
  );
};

export default DoctorsPage;
