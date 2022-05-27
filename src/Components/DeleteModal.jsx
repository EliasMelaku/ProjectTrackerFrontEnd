import React from "react";

import "./deleteModal.css";

const DeleteModal = ({ display, onClose }) => {
  if (display == false) {
    return null;
  }
  return (
    <div className="delModalContainer">
      <div className="myDeleteModal">
        <button onClick={onClose}>
          <i className="fa-solid fa-x closeModal"></i>
        </button>
        <h4 className="myModalTitle">
          Are you sure you want to delete this task?
        </h4>
        <button className="confirmDelete"><i className="fa-solid fa-trash"></i>  Delete</button>
        <button className="cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteModal;
