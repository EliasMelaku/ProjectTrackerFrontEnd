import React from "react";
import axios from "axios";

import "./confirmModal.css";

const DeleteModal = ({ type, display, onClose, id }) => {
  if (display == false) {
    return null;
  }

  var modalTitle =
    type == true
      ? "Are you sure you want to delete this task?"
      : "Mark this task as completed?";
  var icon = type == true ? "fa-trash" : "fa-check";
  var btnText = type == true ? "Delete" : "Complete";
  // var action = (type == true) ? onDelete : onComplete;

  const handleClick = () => {
    if (type == true) {
      axios
        .delete(`https://localhost:7227/api/ProjectTask/${id}`)
        .then((res) => {
          // console.log(id);
          // console.log(res);
          onClose()
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`https://localhost:7227/api/ProjectTask/${id}`)
        .then((res) => {
          // console.log(id);
          onClose()
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="delModalContainer">
      <div className="myDeleteModal">
        <button onClick={onClose}>
          <i className="fa-solid fa-x closeModal"></i>
        </button>
        <h4 className="myModalTitle">{modalTitle}</h4>
        <button className={"confirm" + btnText} onClick={handleClick}>
          <i className={"fa-solid " + icon}></i> {btnText}{" "}
        </button>
        <button className="cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
