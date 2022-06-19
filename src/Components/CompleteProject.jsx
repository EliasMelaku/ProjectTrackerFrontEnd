import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const CompleteProject = ({ display, id, report, onClose, onCompleted }) => {
  const [extraMsg, setExtraMsg] = useState("");
  const [warn, setWarn] = useState("");

  useEffect(() => {
    report == null ? setExtraMsg(" without a report") : setExtraMsg("");
    report == null ? setWarn("") : setWarn("hide");
  }, [report]);

  if (display == false) {
    return null;
  }
  const handleClick = () => {
    if (report != null) {
      console.log(report);
      const formData = new FormData();
      formData.append("report", report);
      axios
        .post(`https://localhost:7227/api/File/${id}`, formData)
        .then((res) => {
            onCompleted();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`https://localhost:7227/api/Project/complete/${id}`)
        .then((res) => {
            onCompleted();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="delModalContainer">
      <div className="myDeleteModal">
        {/* <img src={source} alt="imageHere" className="modalImage"/> */}
        <button onClick={onClose}>
          <i className="fa-solid fa-x closeModal"></i>
        </button>
        <h4 className="myModalTitle">
          Are you sure you want to complete this project <b>{extraMsg}</b>{" "}
          <i className={"fa-solid fa-triangle-exclamation" + warn}></i>
        </h4>
        <button className={"confirmComplete"} onClick={handleClick}>
          <i className={"fa-solid fa-check"}></i> Complete
        </button>
        <button className="cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CompleteProject;
