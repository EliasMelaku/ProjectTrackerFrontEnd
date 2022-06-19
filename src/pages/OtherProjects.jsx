import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import SingleProject from "../Components/SingleProject";


const OtherProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios
      .get(`https://localhost:7227/api/Project/others/${localStorage.getItem("id")}`)
      .then((res) => {
        // console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        // console.log(localStorage.getItem('token'))
        console.log(err);
      });
  };

  let renderProjects;

  if (projects.length > 0) {
    renderProjects = <SingleProject projects={projects} isOther={true} isCompleted={null}/>;
  } else {
    renderProjects = <div className="noProjects"> You aren't involved in any other projects.</div>;
  }
  return (
    <div className="projectsContainer">
      <h1>Other Projects</h1>
      <div className="cardContainer myProjects">{renderProjects}</div>
      {/* <h1>Other Projects</h1>
      <div className="cardContainer otherProjects">
        <SingleProject projects={projects} />
      </div> */}
    </div>
  );
}

export default OtherProjects