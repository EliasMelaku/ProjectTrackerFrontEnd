import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import SingleProject from "../Components/SingleProject";
import { LoginContext } from "../LoginContext";

const Home = () => {

  let navigate = useNavigate();
  const location = useLocation();
  const [LoginStatus, setLoginStatus] = useContext(LoginContext);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    if (!LoginStatus) {
      navigate("/login", { replace: true , state:{ message: "Login"} });
    } else {
      getProjects();
    }
  };

  const getProjects = () => {
    axios
      .get(`https://localhost:7227/api/Auth/${location.state.id}`)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data.projects);
      })
      .catch((err) => {
        // console.log(localStorage.getItem('token'))
        console.log(err);
      });
  };

  return (
    <div>
      <SingleProject projects={projects}/>
    </div>
  );
};

export default Home;
