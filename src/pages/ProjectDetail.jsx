import React, { useEffect, useState } from "react";
import "./css/projectDetail.css";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProgressBar } from "react-bootstrap";

import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TaskModal from "../Components/TaskModal";
import SingleProject from "../Components/SingleProject";
import ConfirmModal from "../Components/ConfirmModal";
import { boolean, number, NumberSchema } from "yup";
import DeleteModal from "../Components/DeleteModal";
import CompleteProject from "../Components/CompleteProject";
import ViewPDF from "../Components/ViewPDF";

const ProjectDetail = ({ isCompleted }) => {
  const projectId = useParams().id;

  const navigate = useNavigate();

  // Declare state to re-render
  const [reRender, setRerender] = useState(boolean);

  useEffect(() => {
    getProject();
    // updateCompletion();
  }, [reRender]);

  let completedTaskList;
  let activeTaskList;
  let usersList = (
    <div className="noUsers">
      <img src={require("./images/nothing.png")} alt="Here" className="bear" />
      <p>No-one here</p>
    </div>
  );

  // Useful states for the modals
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);

  // const [refresh, setRefresh] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [currentTask, setCurrentTask] = useState(0);

  // States for data from the API (making lists)

  const [completedTasks, setCompletedTasks] = useState([]);
  const [projCompletion, setProjCompletion] = useState(0);
  const [selectedFile, setSelectedFile] = useState(
    <>
      Upload <i className="fa-solid fa-upload"></i>
    </>
  );
  const [selectedFileFull, setSelectedFileFull] = useState("");
  const [selectedFileFile, setSelectedFileFile] = useState(null);
  const [completeProject, setCompleteProject] = useState(false);

  // State for components from the api

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectManagerId, setProjectManagerId] = useState(0);
  const [report, setReport] = useState("");

  const [deliverable25, setDeliverable25] = useState([]);
  const [deliverable50, setDeliverable50] = useState([]);
  const [deliverable75, setDeliverable75] = useState([]);
  const [deliverable100, setDeliverable100] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);

  useEffect(() => {
    showReport();
  }, [report]);

  let renderDel25;
  let renderDel50;
  let renderDel75;
  let renderDel100;

  // const uploadPDF = () => {
  //   if (selectedFileFile !== undefined){
  //     console.log(true)
  //   }
  // }

  const getProject = () => {
    axios
      .get(`https://localhost:7227/api/Project/${projectId}`)
      .then((res) => {
        // console.log(res.data);
        setProjectManagerId(res.data.projectManagerId);
        setProjectTitle(res.data.title);
        setProjectDescription(res.data.description);
        setDeliverable25(res.data.deliverables[0].split("^"));
        setDeliverable50(res.data.deliverables[1].split("^"));
        setDeliverable75(res.data.deliverables[2].split("^"));
        setDeliverable100(res.data.deliverables[3].split("^"));
        setCompletedTasks(res.data.tasks);
        setReport(res.data.report);
        setProjectUsers(res.data.users);
      })
      .catch((err) => {
        // console.log(localStorage.getItem('token'))
        console.log(err);
      });
  };

  const checkIfExists = (bool) => {
    return completedTasks.some((task) => {
      return task.isCompleted == bool;
    });
  };

  // calculate the perecentage for the progress bar
  const calculatePercentage = () => {
    const completedLength = completedTasks.filter((task) => {
      return task.isCompleted;
    }).length;
    return Math.round((completedLength / completedTasks.length) * 100) || 0;
  };

  // Some conditions for said dynamically displayed components
  const updateCompletion = (completion) => {
    axios
      .put(`https://localhost:7227/api/Project/${projectId}/${completion}`)
      .then((res) => {
        setProjCompletion(completion);
      })
      .catch((err) => console.log(err));
  };

  if (completedTasks.length > 0) {
    // console.log(calculatePercentage())
    // setTimeout(() => {console.log(calculatePercentage())}, 2000)
    completedTaskList = (
      <>
        {completedTasks.map((completedTask, index) =>
          completedTask.isCompleted == true ? (
            <SwiperSlide key={index}>
              {
                <div className="taskCard">
                  <h4 className="taskTitle">{completedTask.title}</h4>
                  <p className="taskDescription">{completedTask.description}</p>
                  {isCompleted == false ? (
                    <button
                      onClick={() => {
                        setIsNew(true);
                        setCurrentTask(completedTask.id);
                        setDeleteConfirm(true);
                      }}
                    >
                      <i
                        title="Delete Task"
                        className="fa-solid fa-trash-can trash-alone"
                      ></i>
                    </button>
                  ) : null}
                </div>
              }
            </SwiperSlide>
          ) : null
        )}
      </>
    );
    activeTaskList = (
      <>
        {completedTasks.map((completedTask, index) =>
          completedTask.isCompleted != true ? (
            <SwiperSlide key={index}>
              {
                <div className="taskCard">
                  <h4 className="taskTitle">{completedTask.title}</h4>
                  <p className="taskDescription">{completedTask.description}</p>
                  <button
                    onClick={() => {
                      setTitle(completedTask.title);
                      setDesc(completedTask.description);
                      setCurrentTask(completedTask.id);
                      setIsNew(false);
                      setIsOpen(true);
                    }}
                  >
                    <i
                      title="Edit Task"
                      className="fa-solid fa-pen-to-square"
                    ></i>
                  </button>
                  <button
                    onClick={() => {
                      setIsNew(true);
                      setCurrentTask(completedTask.id);
                      setDeleteConfirm(true);
                    }}
                  >
                    <i
                      title="Delete Task"
                      className="fa-solid fa-trash-can"
                    ></i>
                  </button>
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setCurrentTask(completedTask.id);
                      setDeleteConfirm(true);
                    }}
                  >
                    <i
                      title="Mark as Completed"
                      className="fa-solid fa-circle-check"
                    ></i>
                  </button>
                </div>
              }
            </SwiperSlide>
          ) : (
            <h3 className="whenEmpty">You have no active tasks.</h3>
          )
        )}
      </>
    );
  }

  if (projectUsers.length > 0) {
    usersList = projectUsers.map((user, index) => (
      <div className="multiOptionChoice projMember" key={index}>
        <img src={require(`./images/${user.profile}.jpg`)} />{" "}
        <p>{user.username}</p>
      </div>
    ));
  }

  if (!checkIfExists(false)) {
    // console.log(completedTasks.length);
    activeTaskList = <h3 className="whenEmpty">You have no active tasks.</h3>;
  }
  if (!checkIfExists(true)) {
    // console.log("here");
    completedTaskList = (
      <h3 className="whenEmpty">You have no completed tasks yet.</h3>
    );
  }

  // Some functions

  const deleteTask = (event) => {
    event.preventDefault();
    console.log(event);
  };
  const completeTask = (event) => {
    event.preventDefault();
    console.log("Completed");
  };

  const showReport = () => {
    return (
      <div className="projectReport">
        <ViewPDF report={report} />{" "}
      </div>
    );
  };

  renderDel25 =
    (deliverable25.length > 0) & (deliverable25[0] != "") ? (
      deliverable25.map((del, index) => <li key={index}>{del}</li>)
    ) : (
      <p className="noDelv">No Deliverables</p>
    );
  renderDel50 =
    (deliverable50.length > 0) & (deliverable25[0] != "") ? (
      deliverable50.map((del, index) => <li key={index}>{del}</li>)
    ) : (
      <p className="noDelv">No Deliverables</p>
    );
  renderDel75 =
    (deliverable75.length > 0) & (deliverable25[0] != "") ? (
      deliverable75.map((del, index) => <li key={index}>{del}</li>)
    ) : (
      <p className="noDelv">No Deliverables</p>
    );
  renderDel100 =
    (deliverable100.length > 0) & (deliverable25[0] != "") ? (
      deliverable100.map((del, index) => <li key={index}>{del}</li>)
    ) : (
      <p className="noDelv">No Deliverables</p>
    );

  return (
    <div className="projectDetailContainer">
      <div className="projectDetails">
        <div className="information">
          {isCompleted == false &&
          projectManagerId == localStorage.getItem("id") ? (
            <Link to={`/editProject/${projectId}`}>
              <div className="toEditProject">
                <i
                  title="Edit Project"
                  className="fa-solid fa-pen-to-square fa-2x"
                ></i>
              </div>
            </Link>
          ) : null}

          <h2 className="projectTitle">{projectTitle}</h2>
          <h5 className="projectDescription">{projectDescription}</h5>
        </div>

        {/* ================================ON GOING TASKS================================ */}
        {isCompleted == false ? (
          <>
            <h4>On Going Tasks</h4>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{}}
              navigation={{}}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                "@1.50": {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {projectManagerId == localStorage.getItem("id") ? (
                <SwiperSlide>
                  {
                    <button
                      onClick={() => {
                        setTitle("");
                        setDesc("");
                        setIsNew(true);
                        setIsOpen(true);
                      }}
                    >
                      <div className="newTask">
                        <i className="fa-solid fa-plus"></i>
                        <p>Add New Task</p>
                      </div>
                    </button>
                  }
                </SwiperSlide>
              ) : null}

              {activeTaskList}
            </Swiper>
          </>
        ) : null}

        {/* =================================COMPLETED TASKS=============================== */}
        <h4>Completed Tasks</h4>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{}}
          navigation={{}}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {completedTaskList}
        </Swiper>

        {/* ================================MEMBERS(USERS)================================ */}
        <h4>Members </h4>
        <div className="projectMembers">{usersList}</div>

        {/* ===========================STAGE AND DELIVERABLES==================================== */}
        <h4>Stage</h4>

        <div className="stage">
          <div className="progressbar">
            <ProgressBar
              now={calculatePercentage()}
              label={calculatePercentage() + "%"}
              className="myProgress"
              onChange={updateCompletion(calculatePercentage())}
            />
            <div className="deliverable FQ"></div>
            <div className="deliverable SQ"></div>
            <div className="deliverable TQ"></div>
            <div className="deliverable FoQ"></div>
          </div>
          <div className="delvs">
            <div className="delv delv1">
              <div className="paper">
                <div className="">
                  At 25%
                  <ul>{renderDel25}</ul>
                </div>
              </div>
            </div>
            <div className="delv delv1">
              <div className="paper">
                <div className="">
                  At 50%
                  <ul>{renderDel50}</ul>
                </div>
              </div>
            </div>
            <div className="delv delv1">
              <div className="paper">
                <div className="">
                  At 75% <ul>{renderDel75}</ul>
                </div>
              </div>
            </div>
            <div className="delv delv1">
              <div className="paper">
                <div className="">
                  At 100% <ul>{renderDel100}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCompleted == true ? showReport() : null}

      {projectManagerId == localStorage.getItem("id") ? (
        <div className="twoForms">
          {isCompleted == false ? (
            <>
              <div className="dangerForm editProject">
                <h4>Upload a report and Complete this Project</h4>
                <div className="buttons">
                  <input
                    type="file"
                    id="uploadReport"
                    accept=".pdf"
                    onChange={(event) => {
                      setSelectedFileFull(event.target.value);
                      setSelectedFileFile(event.target.files[0]);
                      event.target.value.length > 0
                        ? setSelectedFile(
                            <>{event.target.value.substring(12, 22)}</>
                          )
                        : setSelectedFile(
                            <>
                              Upload <i className="fa-solid fa-upload"></i>
                            </>
                          );
                    }}
                  />
                  <label
                    htmlFor="uploadReport"
                    className="deleteAccountBtn uploadReportBtn"
                  >
                    {selectedFile}
                  </label>
                  {/* <button className="deleteAccountBtn uploadReportBtn">
              Upload <i className="fa-solid fa-upload"></i>
            </button> */}
                  <button
                    className="deleteAccountBtn editProjBtn"
                    disabled={projCompletion !== 100}
                    onClick={() => {
                      setCompleteProject(true);
                    }}
                  >
                    Complete <i className="fa-solid fa-check"></i>
                  </button>
                </div>
              </div>
            </>
          ) : null}

          <div className="dangerForm deleteProject">
            <h4>Delete this Project</h4>
            <button
              className="deleteAccountBtn"
              onClick={() => {
                setDeleteProject(true);
              }}
            >
              Delete <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      ) : null}

      <TaskModal
        display={isOpen}
        type={isNew}
        id={projectId}
        taskId={currentTask}
        title={title}
        description={desc}
        onClose={() => {
          setIsOpen(false);
          setRerender(!reRender);
        }}
      />
      <ConfirmModal
        display={deleteConfirm}
        type={isNew}
        projId={projectId}
        id={currentTask}
        onClose={async () => {
          setDeleteConfirm(false);
          setRerender(!reRender);
        }}
      />
      <DeleteModal
        display={deleteProject}
        type={isNew}
        id={projectId}
        onClose={() => setDeleteProject(false)}
        onDeleted={() => {
          setDeleteProject(false);
          navigate("/home", { replace: true });
        }}
      />
      <CompleteProject
        display={completeProject}
        id={projectId}
        report={selectedFileFile}
        onClose={() => setCompleteProject(false)}
        onCompleted={() => {
          setCompleteProject(false);
          navigate("/completedProjects", { replace: true });
        }}
      />
    </div>
  );
};

export default ProjectDetail;
