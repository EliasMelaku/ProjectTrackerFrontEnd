import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Deliverable from "../Components/Deliverable";

import "./css/newProject.css";

const NewProject = () => {
  const [value, setvalue] = useState("");

  const [deliveralbes25, setDeliverable25] = useState([{ deliverable: "" }]);
  const [deliveralbes50, setDeliverable50] = useState([{ deliverable: "" }]);
  const [deliveralbes75, setDeliverable75] = useState([{ deliverable: "" }]);
  const [deliveralbes100, setDeliverable100] = useState([{ deliverable: "" }]);

  const handleOnchange = (val) => {
    setvalue(val);
  };

  const options = [
    {
      label: (
        <div className="multiOptionChoice">
          <img src={require("./images/male3.jpg")} /> <p>Username 1</p>
        </div>
      ),
      value: "user 1",
    },
    {
      label: (
        <div className="multiOptionChoice">
          <img src={require("./images/male1.jpg")} /> <p>Username 2</p>
        </div>
      ),
      value: "user 2",
    },
    {
      label: (
        <div className="multiOptionChoice">
          <img src={require("./images/fem1.jpg")} /> <p>Username 3</p>
        </div>
      ),
      value: "user 3",
    },
    {
      label: (
        <div className="multiOptionChoice">
          <img src={require("./images/fem2.jpg")} /> <p>Username 4</p>
        </div>
      ),
      value: "user 4",
    },
    {
      label: (
        <div className="multiOptionChoice">
          <img src={require("./images/fem2.jpg")} /> <p>Username 5</p>
        </div>
      ),
      value: "user 5",
    },
  ];

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

  return (
    <div className="newProjectContainer">
      <form action="" className="newProjectForm">
        <h3 className="newProjTitle">Create a new project</h3>
        {/* <label htmlFor="projectTitle">Project Title</label> */}
        <p className="priorityTitle">Project Title</p>
        <input
          type="text"
          name="projectTitle"
          className="projectTitle"
          placeholder="A unique title for the project"
        />
        <p className="priorityTitle">Project Description</p>
        <input
          type="text"
          className="projectDesc"
          placeholder="Short description about the project"
        />

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
              value={"1"}
            />
            <label htmlFor="radio-low" className="radioLabel lowlabel">
              Low
            </label>
            <input
              className="radioChoice midchoice"
              type="radio"
              name="priorityLevel"
              id="radio-med"
              value={"2"}
            />
            <label htmlFor="radio-med" className="radioLabel midlabel">
              Medium
            </label>
            <input
              className="radioChoice highchoice"
              type="radio"
              name="priorityLevel"
              id="radio-high"
              value={"3"}
            />
            <label htmlFor="radio-high" className="radioLabel highlabel">
              High
            </label>
          </div>
          <input type="date" name="dueDate" className="dueDatePicker" />
        </div>

        {/* Dropdown to select the department */}
        <p className="priorityTitle">Select Department</p>
        <select className="deptSelect">
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="meat">Meat</option>
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
