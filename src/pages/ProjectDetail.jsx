import React, { useState } from "react";
import "./css/projectDetail.css";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProgressBar } from "react-bootstrap";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TaskModal from "../Components/TaskModal";
import SingleProject from "../Components/SingleProject";
import DeleteModal from "../Components/DeleteModal";

const ProjectDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="projectDetailContainer">
      <div className="projectDetails">
        <h2 className="projectTitle">Project Title</h2>
        <h5 className="projectDescription">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fuga
          minus ipsam dolores expedita iure, dolor amet non enim? Ab.
        </h5>
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
          <SwiperSlide>
            {
              <div className="taskCard">
                <h4 className="taskTitle">Task Title</h4>
                <p className="taskDescription">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi maxime ad quo vero aperiam odit.
                </p>
                <button
                  onClick={() => {
                    setTitle("Task Title");
                    setDesc("Task Description");
                    setIsNew(false);
                    setIsOpen(true);
                  }}
                >
                  <i title="Edit Task" className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => {
                    setDeleteConfirm(true);
                  }}
                >
                  <i title="Delete Task" className="fa-solid fa-trash-can"></i>
                </button>
                <i
                  title="Mark as Completed"
                  className="fa-solid fa-circle-check"
                ></i>
              </div>
            }
          </SwiperSlide>
          <SwiperSlide>
            {
              <div className="taskCard">
                <h4 className="taskTitle">Task Title</h4>
                <p className="taskDescription">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                  quisquam, neque facilis recusandae molestiae doloremque
                  excepturi tempore dolor? Culpa, consequatur!
                </p>
              </div>
            }
          </SwiperSlide>
          <SwiperSlide>
            {
              <div className="taskCard">
                <h4 className="taskTitle">Task Title</h4>
                <p className="taskDescription">Task Description</p>
              </div>
            }
          </SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
        </Swiper>
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
          <h3 className="whenEmpty">You have no completed tasks yet.</h3>
        </Swiper>
        <h4>Members </h4>
        <div className="projectMembers">
          <div className="multiOptionChoice projMember">
            <img src={require("./images/male3.jpg")} /> <p>Username 1</p>
          </div>
          <div className="multiOptionChoice projMember">
            <img src={require("./images/male3.jpg")} /> <p>Username 1</p>
          </div>
          <div className="multiOptionChoice projMember">
            <img src={require("./images/male3.jpg")} /> <p>Username 1</p>
          </div>
          <div className="multiOptionChoice projMember">
            <img src={require("./images/male3.jpg")} /> <p>Username 1</p>
          </div>
          <div className="multiOptionChoice projMember">
            <img src={require("./images/male3.jpg")} /> <p>Username 1</p>
          </div>
        </div>
        <h4>Stage</h4>
        <div className="stage">
          <div className="progressbar">
            <ProgressBar now={60} label={"60%"} className="myProgress" />
            <div className="deliverable FQ"></div>
            <div className="deliverable SQ"></div>
            <div className="deliverable TQ"></div>
            <div className="deliverable FoQ"></div>
          </div>
          <div className="delvs">
            <div className="delv delv1">
              <div className="paper">
                <div className="lines">
                  Some text
                </div>
              </div>
            </div>
            <div className="delv delv1">
              <div className="paper">
                <div className="lines">
                  Some text
                </div>
              </div>
            </div>
            <div className="delv delv1">
              <div className="paper">
                <div className="lines">
                  Some text
                </div>
              </div>
            </div>
            <div className="delv delv1">
              <div className="paper">
                <div className="lines">
                  Some text
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button >OPen</button> */}
      <TaskModal
        display={isOpen}
        type={isNew}
        title={title}
        description={desc}
        onClose={() => setIsOpen(false)}
      />
      <DeleteModal
        display={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
      />
    </div>
  );
};

export default ProjectDetail;
