import React, { useState, useEffect } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Deliverable from "../Components/Deliverable";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "../pages/css/newProject.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { projectSchema } from "../Validations/ProjectValidation";

const ProjectForm = ({ type, id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    if (type == false) {
      getProject();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectSchema),
  });

  const formTitle = type == true ? "Create a new Project" : "Edit your project";
  const btnTitle = type == true ? "Create" : "Save Changes";

  const [alertState, setAlertState] = useState(Boolean);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStyle, setAlertStyle] = useState("");

  const [value, setvalue] = useState("");
  const [radio, setRadio] = useState("");
  const [dept, setDept] = useState("IT");

  useEffect(() => {
    updateUsers();
  }, [value]);
  useEffect(() => {
    renderRadio();
  }, [radio]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [deliverables25, setDeliverable25] = useState([""]);
  const [deliverables50, setDeliverable50] = useState([""]);
  const [deliverables75, setDeliverable75] = useState([""]);
  const [deliverables100, setDeliverable100] = useState([""]);

  const [users, setUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);

  function pad(s) {
    return s < 10 ? "0" + s : s;
  }

  const getProject = () => {
    axios
      .get(`https://localhost:7227/api/Project/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        const d = new Date(res.data.dueDate);
        const currDate = [
          pad(d.getFullYear()),
          pad(d.getMonth() + 1),
          d.getDate(),
        ].join("-");
        setDate(currDate);
        setRadio(res.data.urgency);
        setDept(res.data.department);
        setDeliverable25(res.data.deliverables[0].split("^"));
        setDeliverable50(res.data.deliverables[1].split("^"));
        setDeliverable75(res.data.deliverables[2].split("^"));
        setDeliverable100(res.data.deliverables[3].split("^"));
      })
      .catch((err) => console.log(err));
  };

  const getUsers = () => {
    axios
      .get(`https://localhost:7227/api/Auth`)
      .then((res) => {
        var choices = res.data;
        setUsers(
          choices.filter((user) => user.id != localStorage.getItem("id"))
        );
        // setvalue("monke")
      })
      .catch((err) => console.log(err));
  };

  const handleOnchange = (val) => {
    setvalue(val);
  };

  const updateUsers = () => {
    // console.log(value)
    const userNames = value.split(",");
    // console.log(userNames)

    // setUserIds(users.filter(u => {return userNames.includes(u.username)}));
    setUserIds(
      users
        .filter((user) => userNames.includes(user.username))
        .map((user) => user.id)
    );
  };

  const options = users.map((user, index) => ({
    label: (
      <div className="multiOptionChoice" key={index}>
        <img src={require("../pages/images/" + user.profile + ".jpg")} />{" "}
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
        values = [...deliverables25];
        values[index].deliverable = event.target.value;
        setDeliverable25(values);
        // console.log(deliverables25);
        break;
      case 50:
        values = [...deliverables50];
        values[index].deliverable = event.target.value;
        setDeliverable50(values);
        // console.log(deliverables50);
        break;
      case 75:
        values = [...deliverables75];
        values[index].deliverable = event.target.value;
        setDeliverable75(values);
        break;
      case 100:
        values = [...deliverables100];
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
        setDeliverable25([...deliverables25, ""]);
        break;
      case 50:
        setDeliverable50([...deliverables50, ""]);
        break;
      case 75:
        setDeliverable75([...deliverables75, ""]);
        break;
      case 100:
        setDeliverable100([...deliverables100, ""]);
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
        values = [...deliverables25];
        values.splice(-1);
        setDeliverable25(values);
        break;
      case 50:
        values = [...deliverables50];
        values.splice(-1);
        setDeliverable50(values);
        break;
      case 75:
        values = [...deliverables75];
        values.splice(-1);
        setDeliverable75(values);
        break;
      case 100:
        values = [...deliverables100];
        values.splice(-1);
        setDeliverable100(values);
        break;

      default:
        break;
    }
  };

  const tryCreateNewProject = (event) => {
    // console.log(userNames)
    // console.log(event.dueDate)

    const newProject = {
      projectManagerId: localStorage.getItem("id") || 1,
      department: dept,
      title: `${event.projectTitle}`,
      description: `${event.projectDescription}`,
      createdDate: new Date(Date.now()).toJSON(),
      dueDate: `${event.dueDate.toJSON()}`,
      urgency: radio,
      completion: 0,
      deliverables: [
        deliverables25.join("^"),
        deliverables50.join("^"),
        deliverables75.join("^"),
        deliverables100.join("^"),
      ],

      users: userIds,
      report: "noReport",
    };

    console.log(newProject);

    if (type == true){
      axios
        .post(`https://localhost:7227/api/Project`, newProject)
        .then((res) => {
          setAlertMessage("New Project successfully created")
          setAlertStyle("")
          setAlertState(true)
          setTimeout(() => {setAlertState(false)}, 2000);
          setTimeout(() => {
            navigate("/home", { replace: true});
          }, 2500);
        })
        .catch((err) => {
          setAlertMessage("Project Title must be unique")
          setAlertStyle("notice-alert")
          setAlertState(true)
          setTimeout(() => {setAlertState(false)}, 3000);
        });
    }

    else {
      axios
        .put(`https://localhost:7227/api/Project/${id}`, newProject)
        .then((res) => {
          setAlertMessage("Project successfully Edited")
          setAlertStyle("")
          setAlertState(true)
          setTimeout(() => {setAlertState(false)}, 2000);
          setTimeout(() => {
            navigate(`/activeProject/${id}`, { replace: true});
          }, 2500);
        })
        .catch((err) => {
          setAlertMessage("Project Title must be unique")
          setAlertStyle("notice-alert")
          setAlertState(true)
          setTimeout(() => {setAlertState(false)}, 3000);
        });
    }

  };

  const renderRadio = () => {
    return (
      <>
        <div className="priorityPicker">
          <input
            className="radioChoice lowchoice"
            type="radio"
            name="priorityLevel"
            id="radio-low"
            value={"elective"}
            checked={radio == "elective"}
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
            checked={radio == "moderate"}
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
            checked={radio == "urgent"}
            onChange={(event) => setRadio("urgent")}
          />
          <label htmlFor="radio-high" className="radioLabel highlabel">
            Urgent
          </label>
        </div>
      </>
    );
  };

  return (
    <div className="newProjectContainer">
      <p className={alertState ? "notice " + alertStyle : "notice hide"}>
        {alertMessage}
      </p>
      <form
        action=""
        className="newProjectForm"
        onSubmit={handleSubmit(tryCreateNewProject)}
      >
        <h3 className="newProjTitle">{formTitle}</h3>

        <p className="priorityTitle">Project Title</p>
        <input
          type="text"
          name="projectTitle"
          className="projectTitle"
          placeholder="A unique title for the project"
          defaultValue={title}
          {...register("projectTitle")}
        />
        <p className="error">{errors.projectTitle?.message}</p>

        <p className="priorityTitle">Project Description</p>
        <input
          type="text"
          name="projectDescription"
          className="projectDesc"
          defaultValue={description}
          placeholder="Short description about the project"
          {...register("projectDescription")}
        />
        <p className="error">{errors.projectDescription?.message}</p>

        {/* Date picker for Due Date, and Radio buttons for picking priority */}
        <div className="oneRow">
          <p className="priorityTitle">Set Priority</p>
          <p className="priorityTitle">Set Due Date</p>

          {renderRadio()}
          <input
            type="date"
            name="dueDate"
            className="dueDatePicker"
            defaultValue={date}
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
        <MultiSelect
          onChange={handleOnchange}
          options={options}
          defaultValue={value}
        />

        {/* Add Dynamiclly increasing input fields for deliverables at different stages of the project */}
        <div className="deliverables">
          <p className="priorityTitle">Enter Deliverable(s) at 25%</p>
          <p className="priorityTitle">Enter Deliverable(s) at 50%</p>

          <div className="del del25">
            {deliverables25.map((deliverable25, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                defaultValue={deliverable25}
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
              disabled={deliverables25.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>

          <div className="del del50">
            {deliverables50.map((deliverable50, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                defaultValue={deliverable50}
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
              disabled={deliverables50.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>

          <p className="priorityTitle">Enter Deliverable(s) at 75%</p>
          <p className="priorityTitle">Enter Deliverable(s) at 100%</p>

          <div className="del del75">
            {deliverables75.map((deliverable75, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                defaultValue={deliverable75}
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
              disabled={deliverables75.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
          <div className="del del100">
            {deliverables100.map((deliverable100, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                defaultValue={deliverable100}
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
              disabled={deliverables100.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>

        <input type="submit" value={btnTitle} className="createBtn" />
      </form>
    </div>
  );
};

export default ProjectForm;
