import React, { useEffect, useContext } from "react";
import "./css/login.css";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LoginContext } from "../LoginContext";

const Login = () => {
  // useEffect(() => {
  //   localStorage.clear();
  //   setLoginStatus(false)
  // }, [])

  const [LoginStatus, setLoginStatus] = useContext(LoginContext);

  let navigate = useNavigate();
  const location = useLocation();

  function tryLogin(event) {
    event.preventDefault();

    const userLogin = {
      username: `${event.target.username.value}`,
      password: `${event.target.password.value}`,
    };

    axios
      .post(`https://localhost:7227/api/Auth/login`, userLogin)
      .then((res) => {
        if (res.data === "Password Verification Failed") {
          alert("Username/Password is incorrect");
        } else {
          // console.log(res.data);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("token", res.data.token);
          setLoginStatus(true);
          console.log(LoginStatus);
          navigate("/home", { replace: true, state: { id: res.data.id } });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="formContainer">
      <form className="loginForm" onSubmit={tryLogin}>
        <h2 className="title">Welcome Back</h2>
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <input type="submit" value="Login" />
        <Link to={"/register"} className="link" >
          <p>Have no account? Register Now</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
