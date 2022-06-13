import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/editProfile.css";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { userSchema } from "../Validations/UserValidation";

const EditProfile = () => {
  useEffect(() => {
    getCurrentUser();
  }, []);

  const profiles = ["fem1", "male1", "fem2", "male2", "fem3", "male3"];
  const [selectedProfile, setProfile] = useState("default");

  const [alertState, setAlertState] = useState(Boolean);
  // const [notcieStyle, setNoticeStyle] = useState("");
  const [noticeText, setNoticeText] = useState("");

  // const [credentials, setCredentials] = useState({});

  const [newUsername, setNewUsername] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newFirstname, setNewFirstname] = useState("")
  const [newLastname, setNewLastname] = useState("")

  // Function to display chosen profile
  const changeProfile = (event) => {
    event.preventDefault();
    if (event.target.alt) {
      setProfile(event.target.alt);
    }
  };

  const getCurrentUser = () => {
    axios
      .get(
        `https://localhost:7227/api/Auth/string/${localStorage.getItem(
          "username"
        )}`
      )
      .then((res) => {
        // console.log(res.data);
        setNewUsername(res.data.username);
        setNewEmail(res.data.email);
        setNewFirstname(res.data.firstName);
        setNewLastname(res.data.lastName);
        setProfile(res.data.profile);
        // console.log(selectedProfile)
      })
      .catch((err) => {
        // console.log(localStorage.getItem('token'))
        console.log(err);
      });
  };

  const editUser = (event) => {
    event.preventDefault();
    const updatedUser = {
      id: localStorage.getItem("id"),
      username: newUsername,
      email: newEmail,
      firstname: newFirstname,
      lastname: newLastname,
      profile: selectedProfile,
    };
    // console.log(updatedUser)

    axios
      .put(`https://localhost:7227/api/Auth`, updatedUser)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("username", newUsername)
        localStorage.setItem("profile", selectedProfile)
        setAlertState(true)
        setNoticeText("Account Information Updated")
        setTimeout(() => setAlertState(false), 3000)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="editProfileContainer">
      <p className={alertState ? "notice " : "notice hide" }>{noticeText}</p>
      <div className="editFormContainer">
        <form
          className="editForm"
          onSubmit={event => editUser(event)}
        >
          <h2 className="editTitle">Change your profile icon</h2>
          <div className="iconrow">
            <img
              src={require("./images/" + selectedProfile + ".jpg")}
              alt="profile"
              className="profileIcon"
            />
            {/* <i className="fa fa-user fa-6x profileIcon"></i> */}
            <div className="iconChoices">
              {profiles.map((profile, index) => (
                <button className="choice" onClick={changeProfile} key={index}>
                  <img
                    src={require("./images/" + profile + ".jpg")}
                    alt={profile}
                  />
                </button>
              ))}
            </div>
          </div>
          {/* </form> */}
          <br />
          <hr />
          <br />
          {/* <form className="editForm"> */}
          <h3 className="editTitle">Personal Information</h3>
          <input
            name="username"
            type="text"
            placeholder="Username"
            id="user"
            defaultValue={newUsername}
            onChange={(event) => {setNewUsername(event.target.value)}}
          />

          <input
            name="email"
            type="email"
            placeholder="someone@gmail.com"
            defaultValue={newEmail}
            onChange={(event) => {setNewEmail(event.target.value)}}
          />

          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            defaultValue={newFirstname}
            onChange={(event) => {setNewFirstname(event.target.value)}}
          />

          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            defaultValue={newLastname}
            onChange={(event) => {setNewLastname(event.target.value)}}
          />

          <input type="submit" value="Save Changes" />
        </form>
        <hr />
        {/* <form className="editForm">
          <h3 className="editTitle">Change your password</h3>
          <input
            name="curPassword"
            type="password"
            placeholder="Current Password"
          />
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
          />
          <input
            name="cNewPassword"
            type="password"
            placeholder="Confirm New Password"
          />
          <input type="submit" value="Change Password" />
        </form> */}
      </div>
    </div>
  );
};

export default EditProfile;
