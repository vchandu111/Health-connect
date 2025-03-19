import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    };

    try {
      const response = await fetch(
        "https://backend-health-connect.vercel.app/auth/login",
        requestOptions
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("token_type", result.token_type);
        localStorage.setItem("username", result.username);

        // Show success toast
        toast.success("Login successful! Redirecting to homepage...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Navigate to the homepage after a delay
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        // Handle errors
        console.error(result.detail);
        toast.error("Error: " + result.detail, {
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
      console.error("Login error", error);
      toast.error("Login failed. Please try again.", {
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
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
              Sign In
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-red-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
