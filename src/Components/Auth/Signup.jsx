import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiKey = "AIzaSyAl3XZsqfq5H0w03B_wzGb0WBmG5Mln56I";

  const handleSignup = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    };

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        requestOptions
      );

      const result = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", result.idToken);

        // Show success toast
        toast.success("Signup successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Navigate to login after a delay
        setTimeout(() => {
          navigate("/login");
        }, 3000); // 3 seconds delay to allow the toast to display
      } else {
        // Handle errors
        console.error(result.error.message);
        toast.error("Error: " + result.error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Signup error", error);
      toast.error("Signup failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Toast Container */}
        <ToastContainer />

        {/* Left Side Image */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1676364424409-e87919caffe1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Shopping Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
