import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import Navbar from "./Components/Common/Navbar";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Footer from "./Components/Common/Footer";
import LandingPage from "./Components/Home/LandingPage";
import AllDepartments from "./Components/DepartmentsList";
import DoctorsPage from "./Components/Doctors";
import DoctorDetail from "./Components/DoctorDetail";
import Contact from "./Components/Home/Contact";
import Appointments from "./Components/Appointments";
import News from "./Components/News";
import AboutUs from "./Components/AboutUs";

// Layout component for pages with navbar and footer
const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

// Layout component for auth pages (login/signup)
const AuthLayout = ({ children }) => {
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without navbar and footer */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />

        {/* Main routes with navbar and footer */}
        <Route
          path="/"
          element={
            <MainLayout>
              <LandingPage />
            </MainLayout>
          }
        />
        <Route
          path="/specializations"
          element={
            <MainLayout>
              <AllDepartments />
            </MainLayout>
          }
        />
        <Route
          path="/doctors"
          element={
            <MainLayout>
              <DoctorsPage />
            </MainLayout>
          }
        />
        <Route
          path="/doctors/:department"
          element={
            <MainLayout>
              <DoctorsPage />
            </MainLayout>
          }
        />
        <Route
          path="/appointment/:id"
          element={
            <MainLayout>
              <DoctorDetail />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/appointments"
          element={
            <MainLayout>
              <Appointments />
            </MainLayout>
          }
        />
        <Route
          path="/news"
          element={
            <MainLayout>
              <News />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
