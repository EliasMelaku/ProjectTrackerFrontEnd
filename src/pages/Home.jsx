import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  let navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    if (!localStorage.getItem('username') ) {
      navigate("/login", { replace: true });
    } else {
      getProjects();
    }
  };

  const getProjects = () => {
    axios
      .get(`https://localhost:7227/api/Auth/3`)
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
      {projects.map(project => (
        <h1 key={project.id}>{project.department}</h1>
      ))}
    </div>
  );
};

export default Home;
