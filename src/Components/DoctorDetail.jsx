import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Common/Loader";
import { ToastContainer, toast } from "react-toastify";

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("ddd D"));
  const [selectedTime, setSelectedTime] = useState(null);
  const [dates, setDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [noSlotsAvailable, setNoSlotsAvailable] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://healthconnect-5ad96-default-rtdb.firebaseio.com/doctors/${id}.json`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setDoctor(data))
      .catch((error) => console.error("Error fetching doctor data:", error));
  }, [id]);

  useEffect(() => {
    const upcomingDates = [];
    for (let i = 0; i < 7; i++) {
      upcomingDates.push(dayjs().add(i, "day").format("ddd D"));
    }
    setDates(upcomingDates);
    generateTimeSlots(dayjs().format("ddd D"));
  }, []);

  const generateTimeSlots = (selectedDate) => {
    const slots = [];
    const now = dayjs();
    const isToday = selectedDate === now.format("ddd D");

    for (let hour = 11; hour < 16; hour++) {
      const fullHour = dayjs().hour(hour).minute(0);
      const halfHour = dayjs().hour(hour).minute(30);

      // Only add time slots if they are in the future for today
      if (!(isToday && fullHour.isBefore(now))) {
        slots.push({ time: fullHour.format("HH:mm") });
      }

      if (!(isToday && halfHour.isBefore(now))) {
        slots.push({ time: halfHour.format("HH:mm") });
      }
    }

    setTimeSlots(slots);
    setNoSlotsAvailable(slots.length === 0); // Set noSlotsAvailable to true if no slots are available
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    generateTimeSlots(date);
    setSelectedTime(null);
  };

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userID");

    if (!token) {
      toast.error("Please login to make an appointment", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    } else {
      const appointmentId = uuidv4();

      const appointmentData = {
        doctorName: doctor.name,
        speciality: doctor.speciality.title,
        address: `${doctor.address.line1}, ${doctor.address.line2}`,
        dateTime: `${selectedDate} | ${selectedTime}`,
        image: doctor.image,
        user: { email: email, userId: userId },
      };

      const raw = JSON.stringify(appointmentData);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `https://healthconnect-5248e-default-rtdb.firebaseio.com/appointments/${userId}/${appointmentId}.json`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          toast.success("Appointment successfully booked!", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/appointments");
        })
        .catch((error) => console.error("Error booking appointment:", error));
    }
  };

  if (!doctor) return <Loader />;

  return (
    <div className="container mx-auto py-12 px-6 flex flex-col md:flex-row gap-6 mt-16">
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

        {doctor.available ? (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Booking slots
            </h3>
            <div className="flex space-x-2 mb-4 overflow-x-auto">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => handleDateChange(date)}
                  className={`px-4 py-2 rounded-full ${
                    selectedDate === date
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            {noSlotsAvailable ? (
              <p className="text-center text-red-500 mt-6 mb-6">
                No slots are available today. Please select a different date.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 mb-6">
                {timeSlots.map(({ time }) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedTime === time
                        ? "bg-red-500 text-white"
                        : "text-gray-700 border-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            <button
              className={`px-6 py-3 font-semibold rounded-full transition duration-300 ${
                selectedTime
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={handleBooking}
              disabled={!selectedTime}
            >
              Book an appointment
            </button>
          </div>
        ) : (
          <p className="text-red-500 font-semibold mt-6">
            Doctor is currently unavailable for appointments.
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorDetail;
