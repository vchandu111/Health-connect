import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doc from "../../assets/doc.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        console.log("Signup successful:", result);
        setShowOtpForm(true);
        toast.success("Please enter the verification code sent to your email", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Signup failed:", result);
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
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        console.log("Email verified successfully!");
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
        console.error("Verification failed:", result);
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
      console.error("Verification error:", error);
      toast.error("Verification failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Toast Container */}
      <ToastContainer />

      {/* Left Side - Image */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={doc}
          alt="Healthcare Professional"
          className="w-full h-full object-fit"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-lg text-center bg-white p-8 rounded-lg shadow-xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome to HealthConnect
            </h1>
            <p className="text-gray-600">
              {showOtpForm
                ? "Please enter the verification code sent to your email"
                : "Create your account and start your healthcare journey"}
            </p>
          </div>

          {!showOtpForm ? (
            <form onSubmit={handleSignup} className="space-y-4 shadow-lg p-10">
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    console.log("Updated name:", e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    console.log("Updated username:", e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log("Updated email:", e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log("Updated password:", e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleVerifyOtp}
              className="space-y-4 shadow-lg p-10"
            >
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    console.log("Updated OTP:", e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          <p className="mt-6 text-gray-600 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-500 hover:underline font-medium transition-colors"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
