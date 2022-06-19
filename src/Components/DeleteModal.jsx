import axios from "axios";
import React from "react";
import { useEffect } from "react";


const DeleteModal = ({ display, onClose, onDeleted, type, id }) => {
  if (display == false) {
    return null;
  }

  var modalTitle =
    type == true
      ? "Are you sure you want to delete this project?"
      : "Are you sure you want to delete your account and all associated projects and tasks?";

  const handleClick = () => {
    if (type == false) {
      axios
        .delete(`https://localhost:7227/api/Auth/${localStorage.getItem("id")}`)
        .then((res) => {
          // console.log(id);
          // console.log(res);
          onDeleted();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .delete(`https://localhost:7227/api/Project/${id}`)
        .then((res) => {
          // console.log(id);
          onDeleted();
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
        <button className={"confirmDelete"} onClick={handleClick}>
          <i className={"fa-solid fa-trash"}></i> Delete
        </button>
        <button className="cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
