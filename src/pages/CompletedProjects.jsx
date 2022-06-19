import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import SingleProject from "../Components/SingleProject";
import { LoginContext } from "../LoginContext";

const CompletedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get(`https://localhost:7227/api/Auth/${localStorage.getItem("id")}`)
      .then((res) => {
        // console.log(res.data);
        setProjects(res.data.projects);
      })
      .catch((err) => {
        // console.log(localStorage.getItem('token'))
        console.log(err);
      });
  };

  let renderProjects;

  if (projects.length > 0) {
    renderProjects = <SingleProject projects={projects} isCompleted={true} />;
  } else {
    renderProjects = <div className="noProjects"> You have no completed projects.</div>;
  }
  return (
    <div className="projectsContainer">
      <h1>Completed Projects</h1>
      <div className="cardContainer myProjects">{renderProjects}</div>
      {/* <h1>Other Projects</h1>
      <div className="cardContainer otherProjects">
        <SingleProject projects={projects} />
      </div> */}
    </div>
  );
}

export default CompletedProjects