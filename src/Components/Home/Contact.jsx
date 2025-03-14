import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
  
    fetch("https://health-connect-fastapi-9qbw.vercel.app/form", requestOptions)
      .then((response) => response.text())  // Adjusting this to handle the response as text if that's what the API returns.
      .then((result) => {
        console.log(result);
        toast.success(
          "Thank you for reaching out! We have received your message and will get back to you shortly.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast.error("Failed to send message.", {
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

      <div className="flex flex-col w-3/4 md:flex-row items-center justify-center py-8 pb-12 m-auto">
        <div className="w-full md:w-1/2 h-96 md:h-auto overflow-hidden rounded-lg relative">
          <img
            src="https://cdn.shulex-voc.com/shulex/upload/2024-06-28/1eb69cab-1135-4e1b-9e02-38204c7aeec9.jpg"
            alt="Map Image"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 md:ml-6 mt-8 md:mt-0 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
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
