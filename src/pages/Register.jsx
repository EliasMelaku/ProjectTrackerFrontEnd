import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  let navigate = useNavigate();

  function tryRegister(event) {
    event.preventDefault();

    const userCredentials = {
      username: `${event.target.username.value}`,
      firstname: `${event.target.firstname.value}`,
      lastname: `${event.target.lastname.value}`,
      email: `${event.target.email.value}`,
      password: `${event.target.password.value}`,
      dob: `${event.target.dob.value}`
    };

    axios
      .post(`https://localhost:7227/api/Auth/register`, userCredentials)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="formContainer">
      <form className="loginForm" onSubmit={tryRegister}>
        <h2>Register</h2>
        <input name="username" type="text" placeholder="Username" />
        <input name="firstname" type="text" placeholder="First Name" />
        <input name="lastname" type="text" placeholder="Last Name" />
        <input name="email" type="email" placeholder="someone@gmail.com" />
        <input name="dob" type="date" />
        <input name="password" type="password" placeholder="Password" />
        <input
          name="cPassword"
          type="password"
          placeholder="Confirm Password"
        />
        <input type="submit" value="Register" />
      </form>
      <Link to={"/login"}>
        <p>Already have an account? Login</p>
      </Link>
    </div>
  );
};

export default Register;
