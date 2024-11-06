import React from "react";
import Banner from "./Banner";
import Services from "./Services";
import About from "./About";
import Team from "./Team";
import Offer from "./Offer";
import Department from "./Department";
import Facts from "./Facts";
import ContactUs from "./Contact";
import AppointmentBanner from "./Appointment";

const LandingPage = () => {
  return (
    <>
      <Banner />
      <Services />
      <About />
      <Department />
      <Offer />
      <Facts />
      <Team />
      <ContactUs />
    </>
  );
};

export default LandingPage;
