import React from "react";

import "./css/landing.css";

const Landing = () => {
  return (
    <div className="landingContainer">
      <h2 className="heading">Project Tracker</h2>
      <p className="descriptionText">
        Collaborate, manage projects, and reach new productivity peaks.
      </p>
      {/* <button className="getStarted">Get Started</button> */}
      {/* <div className="arrow"></div> */}
      <div className="cards"></div>
      <button className="btn-wrap">
        <span className="btn">Get Started</span>
      </button>
    </div>
  );
};

export default Landing;
