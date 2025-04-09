import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  console.log(id);
  const navigate = useNavigate();
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `https://backend-health-connect.vercel.app/doctors/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setDoctor(data))
      .catch((error) => console.error("Error fetching doctor data:", error));
  }, [id]);
  console.log(doctor);

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
    console.log("Selected Date and Time:", date);
    console.log("Formatted Date:", date.toLocaleDateString());
    console.log("Formatted Time:", date.toLocaleTimeString());
  };

  const handleBooking = () => {
    if (!selectedDateTime) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to make an appointment", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }

    const dayName = selectedDateTime.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const day = selectedDateTime.getDate();
    const hours = selectedDateTime.getHours().toString().padStart(2, "0");
    const minutes = selectedDateTime.getMinutes().toString().padStart(2, "0");
    const formattedDateTime = `${dayName} ${day} | ${hours}:${minutes}`;

    const appointmentData = {
      doctor_id: Number(id),
      date_time: formattedDateTime,
    };

    console.log("Sending appointment data:", appointmentData);
    console.log(
      "API URL:",
      "https://backend-health-connect.vercel.app/appointments/"
    );

    fetch("https://backend-health-connect.vercel.app/appointments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          return response.json().then((err) => {
            console.error("API Error:", err);
            throw new Error(err.detail || "Failed to book appointment");
          });
        }
        return response.json();
      })
      .then((result) => {
        console.log("Success response:", result);
        toast.success("Appointment successfully booked!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/appointments");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        toast.error(
          error.message || "Failed to book appointment. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      });
  };

  if (!doctor) return <div>...loading</div>;
  return (
    <div className="container mx-auto py-12 px-6 flex flex-col md:flex-row gap-6 mt-16">
      <ToastContainer />
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-48 h-48 rounded-full mb-4 border-8 border-red-400"
        />
      </div>
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
        <p className="text-gray-600 mb-4">
          {doctor.degree} - {doctor.speciality.title} •{" "}
          <span className="bg-red-200 text-gray-700 px-2 py-1 rounded-full text-sm">
            {doctor.experience}
          </span>
        </p>
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-gray-500 mb-6">{doctor.about}</p>
        <h4 className="text-lg font-semibold text-gray-800">
          Appointment fee:{" "}
          <span className="text-green-600">${doctor.fees}</span>
        </h4>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Select Date & Time
          </h3>
          <div className="mb-6">
            <DatePicker
              selected={selectedDateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              timeIntervals={30}
              minDate={new Date()}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholderText="Select date and time"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            className={`px-6 py-3 font-semibold rounded-full transition duration-300 ${
              selectedDateTime
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={handleBooking}
            disabled={!selectedDateTime}
          >
            Book an appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
