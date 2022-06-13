import React, { useEffect, useContext, useState } from "react";
import "./css/login.css";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LoginContext } from "../LoginContext";

// Some imoportant Libraries for handling form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { loginSchema } from "../Validations/UserValidation";

const Login = () => {
  useEffect(() => {
    localStorage.clear();
    setLoginStatus(false)
  }, [])

  const [alertState, setAlertState] = useState(Boolean);
  const [alertMessage, setAlertMessage] = useState("");

  // Get the state of login status to update based on correct login
  const [LoginStatus, setLoginStatus] = useContext(LoginContext);

  let navigate = useNavigate();
  const location = useLocation();

  // Register the form to check for validations witht the corrent schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Function to try and login if credentials are correct and if validation is successful
  
  const tryLogin = (event) => {

    const userCredentials = {
      username: `${event.username}`,
      password: `${event.password}`
    };

    axios
      .post(`https://localhost:7227/api/Auth/login`, userCredentials)
      .then((res) => {
        
        if (res.data === "Password Verification Failed") {
          setAlertMessage("Incorrect Username/Password Combination")
          setAlertState(true)
          setTimeout(() => {setAlertState(false)}, 3000);
        } else {
          // console.log(res.data);
          localStorage.setItem("id", res.data.id)
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("profile", res.data.profile)
          setLoginStatus(true);
          // console.log(LoginStatus);
          navigate("/home", { replace: true });
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status === 404){
          setAlertMessage("An account with the given username was not found")
          setAlertState(true)
          setTimeout(() => {setAlertState(false)}, 3000);
        }
      });
  }

  return (
    <div className="formContainer">
      <p className={alertState ? "notice notice-alert" : "notice hide"}>{alertMessage}</p>
      <form className="loginForm" onSubmit={handleSubmit(tryLogin)}>
        <h2 className="title">Welcome Back</h2>
        <input
          name="username"
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        <p className="error loginError">{errors.username?.message}</p>
        <input
          name="password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="error loginError">{errors.password?.message}</p>
        <input type="submit" value="Login" />
        <Link to={"/register"} className="link">
          <p className="bottomText">Have no account? Register Now</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
