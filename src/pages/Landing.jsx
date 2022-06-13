import React from "react";
import { Link } from "react-router-dom";

import "./css/landing.css";

const Landing = () => {
  return (
    <div className="landingContainer">
      <h2 className="heading">Project Tracker</h2>
      <p className="descriptionText">
        Collaborate, manage projects, and reach new productivity peaks.
      </p>

      <div className="cards"></div>
      <Link to={"/home"}>
        <button className="btn-wrap">
          <span className="btn">Get Started</span>
        </button>
      </Link>
    </div>
  );
};

export default Landing;
