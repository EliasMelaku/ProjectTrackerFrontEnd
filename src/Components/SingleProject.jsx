import React from "react";
import "./css/Project.css";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const SingleProject = ({ projects, isCompleted, isOther }) => {
  const renderBadge = (string) => {
    if (isCompleted == true) {
      return null;
    }
    const today = new Date(Date.now());
    const date = new Date(string);
    if (date < today) {
      return <p className="overdue">Overdue</p>;
    }
    if ((date - today) / 1000 < 86000) {
      return <p className="overdue dueTmw">Due Tomorrow</p>;
    }
  };

  const checkIfExists = (completion) => {
    return projects.some((project) => {
      return project.isCompleted == completion;
    });
  };

  if (!checkIfExists(isCompleted) && isOther != true) {
    return (
      <div className="noProjects">
        {" "}
        You have no {isCompleted ? "completed" : "active"} projects.
      </div>
    );
  }

  return (
    <>
      {projects.map((project, index) => (
        <>
          {project.isCompleted == isCompleted || isOther == true ? (
            <div className="projectContainer" key={index}>
              {renderBadge(project.dueDate)}
              {isOther == true ? (<p>{project.projectManager.username}</p>):null}
              <div className={"urgency " + project.urgency}></div>
              <div className="titleAndDept">
                <h2 className="projectTitle">{project.title}</h2>
                <p className="projectDept">{project.department}</p>
              </div>
              <p className="projectDesc">{project.description}</p>
              <Link
                to={`/${project.isCompleted ? "completed" : "active"}Project/${
                  project.id
                }`}
                className="morelink"
              >
                <div className="more">
                  See more{" "}
                  <i className="fa-solid fa-arrow-right-long moreArrow"></i>
                </div>
              </Link>

              {project.isCompleted == true ? (
                <div className={`progressLabel ${project.report == "noReport" ? "reportMissing" : "reportPresent"}`}>
                  <i className="fa-solid fa-circle-check fa-3x"></i>
                </div>
              ) : (
                <>
                  <p className="progressLabel">
                    <b className="percentage">{project.completion}%</b>Completed
                  </p>
                  <ProgressBar
                    now={project.completion}
                    className="cardProgress"
                  />
                </>
              )}
            </div>
          ) : null}
        </>
      ))}
    </>
  );
};

export default SingleProject;
