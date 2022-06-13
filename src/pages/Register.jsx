import React , {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


// Some imoportant Libraries for handling form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { userSchema } from "../Validations/UserValidation";

// Main Function
const Register = () => {

  // Some variables and states required
  let navigate = useNavigate();
  const [alertState, setAlertState] = useState(Boolean)
  const [notcieStyle, setNoticeStyle] = useState("")
  const [noticeText, setNoticeText] = useState("")


  // var today = new Date(Date.now() + 3000);
  // var dateDefault = today.toISOString().substr(0, 10);


  // Register the form to check for validations witht the corrent schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  // Function to try and register if all data is correct

  const tryRegister = (event) => {

    const userCredentials = {
      username: `${event.username}`,
      firstname: `${event.firstname}`,
      lastname: `${event.lastname}`,
      email: `${event.email}`,
      password: `${event.password}`,
      profile: "default"
    };

    
    axios
    .post(`https://localhost:7227/api/Auth/register`, userCredentials)
    .then((res) => {
      // console.log(res.data)
      if (res.data === "Username" || res.data === "Email"){
        setNoticeStyle("notice-alert")
        setNoticeText(res.data +  " is already taken. Try again with a different " + res.data)
        setAlertState(true)
        setTimeout(() => {setAlertState(false)}, 4000);
      }
      else{
        setNoticeStyle("")
        setNoticeText("You have succesfullly registered. You can now login to your account from the login page")
        setAlertState(true)
        setTimeout(() => {setAlertState(false)}, 4000);
        console.log(userCredentials);
      }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="formContainer">
      <p className={alertState ? "notice " + notcieStyle : "notice hide" }>{noticeText}</p>
      <form className="loginForm register" onSubmit={handleSubmit(tryRegister)}>
        <h2 className="title">Register</h2>
        <input
          name="username"
          type="text"
          placeholder="Username"
          id="user"
          {...register("username")}
        />
        <p className="error">{errors.username?.message}</p>
        <div className="namesContainer">
          <div className="names">
            <input
              name="firstname"
              type="text"
              placeholder="First Name"
              {...register("firstname")}
            />
            <p className="error">{errors.firstname?.message}</p>
          </div>
          <div className="names">
            <input
              name="lastname"
              type="text"
              placeholder="Last Name"
              {...register("lastname")}
            />
            <p className="error">{errors.lastname?.message}</p>
          </div>
        </div>
        <input
          name="email"
          type="email"
          placeholder="someone@gmail.com"
          {...register("email")}
        />
        <p className="error">{errors.email?.message}</p>
        
        <input
          name="password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="error">{errors.password?.message}</p>
        <input
          name="cPassword"
          type="password"
          placeholder="Confirm Password"
          {...register("cPassword")}
        />
        <p className="error">{errors.cPassword?.message}</p>
        <input type="submit" value="Register" />
        <Link to={"/login"} className="link" >
          <p className="bottomText">Already have an account? Login</p>
        </Link>
      </form>
    </div>
  );
};

export default Register;
