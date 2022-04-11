import React from "react";
import './Project.css'

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
      <h1>Department</h1>
      <p className="date start">createdDate</p>
      <p className="date end"> dueDate</p>
      <p className="projectManager">projectManagerId</p>
    </div>
  );
};

export default SingleProject;
