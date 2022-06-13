import React from "react";
import "./Project.css";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const SingleProject = ({ projects }) => {
  return (
    <>
      {projects.map((project, index) => (
        <div className="projectContainer" key={index}>
          <div className={"urgency " + project.urgency}></div>
          <div className="titleAndDept">
            <h2 className="projectTitle">{project.title}</h2>
            <p className="projectDept">{project.department}</p>
          </div>
          <p className="projectDesc">
            {project.description}
          </p>
          <Link to={`/project/${project.id}`} className="morelink">
            <div className="more">
              See more <i className="fa-solid fa-arrow-right-long moreArrow"></i>
            </div>
          </Link>

          <p className="progressLabel">
            <b className="percentage">{project.completion}%</b>Completed
          </p>
          <ProgressBar now={project.completion} className="cardProgress" />
        </div>
      ))}
    </>
  );
};

export default SingleProject;
