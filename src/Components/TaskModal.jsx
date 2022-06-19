import React from "react";
import "./css/taskModal.css";
import axios from "axios";

const TaskModal = ( {display, type,title, description, onClose, id, taskId} ) => {
    if (display == false){
        return null
    }

    var modalTitle = (type == true) ? "Add a new Task" : "Edit Task" ;
    var btnTitle = (type == true) ? "Create Task" : "Save Changes";

    const submitModal = (event) => {
      event.preventDefault();
      var task = {
        title: event.target.taskTitle.value,
        description: event.target.taskDescription.value,
        isCompleted: false,
        projectId: id
      }
      if (type == true){
        axios.post(`https://localhost:7227/api/ProjectTask`, task)
        .then((res) => {
          console.log(res)
          onClose()
        })
        .catch((err) => {
          console.log(err)
        })
      }
      else {
        task.id = taskId
        // console.log(task);
        axios.put(`https://localhost:7227/api/ProjectTask`, task)
        .then((res) => {
          console.log(res)
          onClose()
        })
        .catch((err) => {
          console.log(err)
        })
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
            name="taskTitle"
            className="projectTitle"
            placeholder="A unique title for the task"
            defaultValue={title}
          />
          <p className="priorityTitle">Task Description</p>
          <input
            type="text"
            name="taskDescription"
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
