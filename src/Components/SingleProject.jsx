import React from "react";
import "./Project.css";
import { Link } from "react-router-dom";

const SingleProject = ({ projects }) => {
  return (
    <div className="projectContainer">
      {/* {projects.map((project) => (
        <div key={project.id} style={{border: "solid 2px black"}}>
          <h1>{project.department}</h1>
          <h1>{project.createdDate}</h1>
          <h1>{project.dueDate}</h1>
          <h1>{project.projectManagerId}</h1>
        </div>
      ))} */}
      <div className={"urgency " + "moderate"}></div>
      <div className="titleAndDept">
        <h2 className="projectTitle">New Title</h2>
        <p className="projectDept">Marketing</p>
      </div>
      <p className="projectDesc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
        consequatur, eligendi nemo ipsum numquam vitae ?
      </p>
      <Link to={`/project/${1}`} className="morelink"  >
      <div className="more">
        See more <i class="fa-solid fa-arrow-right-long moreArrow"></i>
      </div>
      </Link>
      
      <p className="progressLabel">
        {" "}
        <b className="percentage">60%</b>Completed
      </p>
      <div className="cardProgress"></div>
    </div>
  );
};

export default SingleProject;
