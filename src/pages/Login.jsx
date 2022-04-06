import React, { useEffect } from "react";
import "./css/login.css"
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom'

const Login = () => {

    useEffect(() => {
      localStorage.clear();
    }, [])

    let navigate = useNavigate();

    function tryLogin(event){
        event.preventDefault();

        

        const userLogin = {
            username: `${event.target.username.value}`,
            password: `${event.target.password.value}`
        }

        axios
      .post(`https://localhost:7227/api/Auth/login`, userLogin)
      .then((res) => {
          if (res.data == "Password Verification Failed"){
              alert("Username/Password is incorrect")
          }
          else{
            // console.log(res.data);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('token', res.data.token);
            navigate("/", { replace: true });
          }
          
        
      })
      .catch((err) => {
        console.log(err);
      });
    }



  return (
    <div className="formContainer">
      <form className="loginForm" onSubmit={tryLogin}>
        <h2>Login</h2>
        <input name="username" type="text" placeholder="name" />
        <input name="password" type="password" placeholder="password" />
        <input type="submit" value="Login" />
      </form>
      <Link to={"/register"}>
        <p>Have no account? Register Now</p>
      </Link>
    </div>
  );
};

export default Login;
