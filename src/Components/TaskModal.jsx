import React from "react";
import "./taskModal.css";

const TaskModal = ( {display, type,title, description, onClose} ) => {
    if (display == false){
        return null
    }

    var modalTitle = (type == true) ? "Add a new Task" : "Edit Task" ;
    var btnTitle = (type == true) ? "Create Task" : "Save Changes";

    const submitModal = (event) => {
      event.preventDefault();
      if (type == true){
        console.log("Create New Task")
      }
      else {
        console.log("Task Edited")
      }
    }

  return (
    <div className="modalContainer">
      <div className="myModal">
        <button onClick={onClose}>
          <i className="fa-solid fa-x closeModal"></i>
        </button>
        <h2 className="myModalTitle">{modalTitle}</h2>
        <form action="" className="modalForm" onSubmit={submitModal}>
          <p className="priorityTitle">Task Title</p>
          <input
            type="text"
            name="projectTitle"
            className="projectTitle"
            placeholder="A unique title for the task"
            defaultValue={title}
          />
          <p className="priorityTitle">Task Description</p>
          <input
            type="text"
            className="projectDesc"
            placeholder="Short description about the task"
            defaultValue={description}
          />
          <input type="submit" value={btnTitle} className="modalSubmit" />
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
