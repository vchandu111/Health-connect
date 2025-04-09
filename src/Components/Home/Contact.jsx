import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      subject,
      message,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch(
      "https://backend-health-connect.vercel.app/contact/get_in_touch",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        toast.success(
          "Thank you for reaching out! We have received your message and will get back to you shortly.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        // Reset all form fields
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <div className="text-center mt-24 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-10">
          Get in Touch
        </h2>
        <p className="text-gray-600">
          Have questions or need assistance? Fill out the form, and our team
          will get back to you shortly.
        </p>
      </div>

      <div className="flex flex-col md:flex-row min-h-[600px]">
        <div className="w-full md:w-1/2 h-[400px] md:h-full">
          <img
            src="https://cdn.shulex-voc.com/shulex/upload/2024-06-28/1eb69cab-1135-4e1b-9e02-38204c7aeec9.jpg"
            alt="Map Image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-md mx-auto w-full"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 h-32 resize-none placeholder-gray-500"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default ContactUs;
