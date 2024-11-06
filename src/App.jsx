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
function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/specializations" element={<AllDepartments />} />
          {/* Add a dynamic route for DoctorsPage */}
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:department" element={<DoctorsPage />} />{" "}
          <Route path="/appointment/:id" element={<DoctorDetail />} />{" "}
          {/* Individual doctor page */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<AboutUs/>} />


          {/* New dynamic route */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
