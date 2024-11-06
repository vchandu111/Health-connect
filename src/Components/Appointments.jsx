import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Common/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [appointmentToCancel, setAppointmentToCancel] = useState(null); // Appointment to be canceled

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://healthconnect-5248e-default-rtdb.firebaseio.com/appointments.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const userAppointments = [];
        Object.entries(data).forEach(([key, appointmentsObj]) => {
          Object.entries(appointmentsObj).forEach(
            ([appointmentId, appointmentData]) => {
              if (
                appointmentData.user &&
                appointmentData.user.userId === userId
              ) {
                userAppointments.push({
                  id: appointmentId,
                  ...appointmentData,
                });
              }
            }
          );
        });

        setAppointments(userAppointments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  }, []);

  // Function to cancel an appointment
  const cancelAppointment = () => {
    const userId = localStorage.getItem("userID");
    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `https://healthconnect-5248e-default-rtdb.firebaseio.com/appointments/${userId}/${appointmentToCancel}.json`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appt) => appt.id !== appointmentToCancel)
          );
          toast.success("Appointment cancelled successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          setShowModal(false);
          setAppointmentToCancel(null);
        } else {
          throw new Error("Failed to cancel appointment.");
        }
      })
      .catch((error) => {
        console.error("Error canceling appointment:", error);
        toast.error("Failed to cancel appointment.", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowModal(false);
      });
  };

  const openCancelModal = (appointmentId) => {
    setAppointmentToCancel(appointmentId);
    setShowModal(true);
  };

  if (loading) return <Loader />;

  if (appointments.length === 0) {
    return (
      <div className="h-screen">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 mt-20 text-center">
          My Appointments
        </h2>

        <p className="text-center text-gray-500 mt-10 ">
          No appointments found.
        </p>
        <button className="bg-red-500 m-auto block mt-10 text-white font-semibold px-4 py-2 sm:py-3 rounded-md w-full sm:w-auto transition duration-300">
          <a href="/doctors">Book Appointment Now</a>
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6 mt-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        My Appointments
      </h2>
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-md"
          >
            {/* Doctor Image */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-6">
              <img
                src={appointment.image}
                alt={appointment.doctorName}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Appointment Details */}
            <div className="w-full md:w-3/4">
              <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                {appointment.doctorName}
              </h3>
              <p className="text-gray-500 mb-2">{appointment.speciality}</p>
              <p className="text-gray-600 mb-2">
                <strong>Address:</strong> {appointment.address}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Date & Time:</strong> {appointment.dateTime}
              </p>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  Call Clinic
                </button>
                <button
                  onClick={() => openCancelModal(appointment.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Cancellation
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this appointment?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                No, Keep Appointment
              </button>
              <button
                onClick={cancelAppointment}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes, Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Appointments;
