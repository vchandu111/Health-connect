import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    };

    try {
      const response = await fetch(
        "https://backend-health-connect.vercel.app/auth/signup",
        requestOptions
      );

      const result = await response.text();

      if (response.ok) {
        setShowOtpModal(true);
        toast.success("Please enter the OTP sent to your email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error(result);
        toast.error("Error: " + result, {
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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        verification_code: otp,
      }),
    };

    try {
      const response = await fetch(
        "https://backend-health-connect.vercel.app/auth/verify-email",
        requestOptions
      );

      if (response.ok) {
        toast.success("Email verified successfully! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const result = await response.text();
        toast.error("Error: " + result, {
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
      console.error("OTP verification error", error);
      toast.error("Verification failed. Please try again.", {
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
          {!showOtpModal ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                />
              </div>
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
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-300"
              >
                Verify OTP
              </button>
            </form>
          )}
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
