import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doc from "../../assets/doc.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      username: username,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(requestData).toString(),
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

        // Navigate to the homepage after a delay
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        // Handle errors
        console.error(result.detail);
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
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
              Sign in to access your healthcare dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 shadow-lg p-10">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-gray-600 text-center">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-red-500 hover:underline font-medium transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
