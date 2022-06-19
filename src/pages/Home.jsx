import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import SingleProject from "../Components/SingleProject";
import { LoginContext } from "../LoginContext";

import "./css/home.css";

const Home = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [LoginStatus, setLoginStatus] = useContext(LoginContext);

  

  const [projects, setProjects] = useState([
    // {
    //   urgency: "urgent",
    //   title: "Title", 
    //   dept: "Marketing",
    //   description: "A bit lengthy description about the project we're doing now, it may not be the best but still",
    //   completion: 60

    // },
    // {
    //   urgency: "moderate",
    //   title: "Some title here", 
    //   dept: "IT",
    //   description: "Another state of the art description that doesn't actually mean anthing and is only here to fill some sace",
    //   completion: 20

    // },
    // {
    //   urgency: "elective",
    //   title: "Interesting Title", 
    //   dept: "IT",
    //   description: "Like the spelling is not even that epic, like a lot of the shit dones is not even relevant to anything ",
    //   completion: 90

    // }
  ]);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    if (!LoginStatus) {
      // 
      if (localStorage.getItem("id") !== null){
        setLoginStatus(true)
        getProjects();
      }
      else{
        navigate("/login", { replace: true, state: { message: "Login" } });
      }
    } else {
      // console.log(LoginStatus)
      setLoginStatus(true)
      getProjects();
    }
  };

  const getProjects = () => {
    axios
      .get(`https://localhost:7227/api/Auth/${localStorage.getItem("id")}`)
      .then((res) => {
        // console.log(res.data);
        setProjects(res.data.projects);
      })
      .catch((err) => {
        // console.log(localStorage.getItem('token'))
        console.log(err);
      });
  };

  let renderProjects;

  if (projects.length > 0) {
    renderProjects = <SingleProject projects={projects} isCompleted={false}/>;
  } else {
    renderProjects = <div className="noProjects"> You have no active projects.</div>;
  }

  return (
    <div className="projectsContainer">
      <h1>My Projects</h1>
      <div className="cardContainer myProjects">{renderProjects}</div>
      {/* <h1>Other Projects</h1>
      <div className="cardContainer otherProjects">
        <SingleProject projects={projects} />
      </div> */}
    </div>
  );
};

export default Home;
