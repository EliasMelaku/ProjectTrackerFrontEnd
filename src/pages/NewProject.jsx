import React, { useState, useEffect } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Deliverable from "../Components/Deliverable";
import axios from "axios";

import "./css/newProject.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { projectSchema } from "../Validations/ProjectValidation";

const NewProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectSchema),
  });

  const [value, setvalue] = useState("");
  const [radio, setRadio] = useState("elective");
  const [dept, setDept] = useState("IT");

  const [deliveralbes25, setDeliverable25] = useState([{ deliverable: "" }]);
  const [deliveralbes50, setDeliverable50] = useState([{ deliverable: "" }]);
  const [deliveralbes75, setDeliverable75] = useState([{ deliverable: "" }]);
  const [deliveralbes100, setDeliverable100] = useState([{ deliverable: "" }]);

  const handleOnchange = (val) => {
    setvalue(val);
  };

  const users = [
    { username: "name1", profile: "male3" },
    { username: "name2", profile: "male1" },
    { username: "name3", profile: "male2" },
    { username: "name4", profile: "fem3" },
    { username: "name5", profile: "fem2" },
    { username: "name6", profile: "male1" },
  ];

  const options = users.map((user, index) => ({
    label: (
      <div className="multiOptionChoice" key={index}>
        <img src={require("./images/" + user.profile + ".jpg")} />{" "}
        <p>{user.username}</p>
      </div>
    ),
    value: user.username,
  }));

  // Change Value of each input field for deliverables
  const changeVal = (index, event, number) => {
    var values;
    switch (number) {
      case 25:
        values = [...deliveralbes25];
        values[index].deliverable = event.target.value;
        setDeliverable25(values);
        // console.log(deliveralbes25);
        break;
      case 50:
        values = [...deliveralbes50];
        values[index].deliverable = event.target.value;
        setDeliverable50(values);
        // console.log(deliveralbes50);
        break;
      case 75:
        values = [...deliveralbes75];
        values[index].deliverable = event.target.value;
        setDeliverable75(values);
        break;
      case 100:
        values = [...deliveralbes100];
        values[index].deliverable = event.target.value;
        setDeliverable100(values);
        break;

      default:
        break;
    }
  };

  // Add input field for deliverables
  const addField = (event, number) => {
    event.preventDefault();
    switch (number) {
      case 25:
        setDeliverable25([...deliveralbes25, { deliverable: "" }]);
        break;
      case 50:
        setDeliverable50([...deliveralbes50, { deliverable: "" }]);
        break;
      case 75:
        setDeliverable75([...deliveralbes75, { deliverable: "" }]);
        break;
      case 100:
        setDeliverable100([...deliveralbes100, { deliverable: "" }]);
        break;

      default:
        break;
    }
  };

  // Remove unwanted fields from deliverables rows
  const removeField = (event, number) => {
    event.preventDefault();
    var values;
    switch (number) {
      case 25:
        values = [...deliveralbes25];
        values.splice(-1);
        setDeliverable25(values);
        break;
      case 50:
        values = [...deliveralbes50];
        values.splice(-1);
        setDeliverable50(values);
        break;
      case 75:
        values = [...deliveralbes75];
        values.splice(-1);
        setDeliverable75(values);
        break;
      case 100:
        values = [...deliveralbes100];
        values.splice(-1);
        setDeliverable100(values);
        break;

      default:
        break;
    }
  };

  const tryCreateNewProject = (event) => {
    // event.preventDefault();

    const del25 = deliveralbes25.map((del) => {
      return del["deliverable"];
    });
    const del50 = deliveralbes50.map((del) => {
      return del["deliverable"];
    });
    const del75 = deliveralbes75.map((del) => {
      return del["deliverable"];
    });
    const del100 = deliveralbes100.map((del) => {
      return del["deliverable"];
    });

    const newProject = {
      projectManagerId: 1 < 0 ? localStorage.getItem("id") : 1,
      department: dept,
      title: `${event.projectTitle}`,
      description: `${event.projectDescription}`,
      createdDate: new Date(Date.now()).toJSON(),
      dueDate: `${event.dueDate.toJSON()}`,
      urgency: radio,
      completion: 0,
      deliverables: [
        del25.join("^"),
        del50.join("^"),
        del75.join("^"),
        del100.join("^"),
      ],

      report: "default",
    };

    // console.log(newProject);

    axios
    .post(`https://localhost:7227/api/Project`, newProject)
    .then((res) => {
      console.log(res.data)
      // if (res.data === "Username" || res.data === "Email"){
      //   setNoticeStyle("notice-alert")
      //   setNoticeText(res.data +  " is already taken. Try again with a different " + res.data)
      //   setAlertState(true)
      //   setTimeout(() => {setAlertState(false)}, 4000);
      // }
      // else{
      //   setNoticeStyle("")
      //   setNoticeText("You have succesfullly registered. You can now login to your account from the login page")
      //   setAlertState(true)
      //   setTimeout(() => {setAlertState(false)}, 4000);
      //   console.log(userCredentials);
      // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="newProjectContainer">
      <form
        action=""
        className="newProjectForm"
        onSubmit={handleSubmit(tryCreateNewProject)}
      >
        <h3 className="newProjTitle">Create a new project</h3>

        <p className="priorityTitle">Project Title</p>
        <input
          type="text"
          name="projectTitle"
          className="projectTitle"
          placeholder="A unique title for the project"
          {...register("projectTitle")}
        />
        <p className="error">{errors.projectTitle?.message}</p>

        <p className="priorityTitle">Project Description</p>
        <input
          type="text"
          name="projectDescription"
          className="projectDesc"
          placeholder="Short description about the project"
          {...register("projectDescription")}
        />
        <p className="error">{errors.projectDescription?.message}</p>

        {/* Date picker for Due Date, and Radio buttons for picking priority */}
        <div className="oneRow">
          <p className="priorityTitle">Set Priority</p>
          <p className="priorityTitle">Set Due Date</p>

          <div className="priorityPicker">
            <input
              className="radioChoice lowchoice"
              type="radio"
              name="priorityLevel"
              id="radio-low"
              value={"elective"}
              onChange={(event) => setRadio("elective")}
            />
            <label htmlFor="radio-low" className="radioLabel lowlabel">
              Low
            </label>
            <input
              className="radioChoice midchoice"
              type="radio"
              name="priorityLevel"
              id="radio-med"
              value={"moderate"}
              onChange={(event) => setRadio("moderate")}
            />
            <label htmlFor="radio-med" className="radioLabel midlabel">
              Medium
            </label>
            <input
              className="radioChoice highchoice"
              type="radio"
              name="priorityLevel"
              id="radio-high"
              value={"urgent"}
              onChange={(event) => setRadio("urgent")}
            />
            <label htmlFor="radio-high" className="radioLabel highlabel">
              Urgent
            </label>
          </div>
          <input
            type="date"
            name="dueDate"
            className="dueDatePicker"
            {...register("dueDate")}
          />
          <div></div>
          <p className="error">{errors.dueDate?.message}</p>
        </div>

        {/* Dropdown to select the department */}
        <p className="priorityTitle">Select Department</p>
        <select
          className="deptSelect"
          onChange={(event) => setDept(event.target.value)}
        >
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="Ticketing">Ticketing</option>
          <option value="Call Center">Call Center</option>
        </select>

        {/* Multiselect input for picking users */}
        <p className="priorityTitle">Select Users</p>
        <MultiSelect onChange={handleOnchange} options={options} />

        {/* Add Dynamiclly increasing input fields for deliverables at different stages of the project */}
        <div className="deliverables">
          <p className="priorityTitle">Enter Deliverable(s) at 25%</p>
          <p className="priorityTitle">Enter Deliverable(s) at 50%</p>

          <div className="del del25">
            {deliveralbes25.map((deliverable25, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                onBlur={(event) => changeVal(index, event, 25)}
              ></input>
            ))}
            <button
              className="addInput"
              onClick={(event) => addField(event, 25)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              className="removeInput"
              onClick={(event) => removeField(event, 25)}
              disabled={deliveralbes25.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>

          <div className="del del50">
            {deliveralbes50.map((deliverable50, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                onBlur={(event) => changeVal(index, event, 50)}
              ></input>
            ))}
            <button
              className="addInput"
              onClick={(event) => addField(event, 50)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              className="removeInput"
              onClick={(event) => removeField(event, 50)}
              disabled={deliveralbes50.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>

          <p className="priorityTitle">Enter Deliverable(s) at 75%</p>
          <p className="priorityTitle">Enter Deliverable(s) at 100%</p>

          <div className="del del75">
            {deliveralbes75.map((deliverable75, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                onBlur={(event) => changeVal(index, event, 75)}
              ></input>
            ))}
            <button
              className="addInput"
              onClick={(event) => addField(event, 75)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              className="removeInput"
              onClick={(event) => removeField(event, 75)}
              disabled={deliveralbes75.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
          <div className="del del100">
            {deliveralbes100.map((deliverable100, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                onBlur={(event) => changeVal(index, event, 100)}
              ></input>
            ))}
            <button
              className="addInput"
              onClick={(event) => addField(event, 100)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              className="removeInput"
              onClick={(event) => removeField(event, 100)}
              disabled={deliveralbes100.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>

        <input type="submit" value="Create" className="createBtn" />
      </form>
    </div>
  );
};

export default NewProject;
