import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/editProfile.css";

import profile1 from "./images/fem1.jpg";
import profile2 from "./images/male1.jpg";
import profile3 from "./images/fem2.jpg";
import profile4 from "./images/male2.jpg";
import profile5 from "./images/fem3.jpg";
import profile6 from "./images/male3.jpg";

const EditProfile = () => {
  const [selectedProfile, setProfile] = useState(1 == 0 ? profile1 : profile2);

  const changeProfile = (event) => {
    event.preventDefault();
    setProfile(event.target.src);
    console.log(event.target.alt);
  };

  return (
    <div className="editProfileContainer">
      {/* <h2 className="editTitle">Edit your profile</h2> */}
      <div className="editFormContainer">
        <form className="editForm">
          <h2 className="editTitle">Change your profile icon</h2>
          <div className="iconrow">
            <img src={selectedProfile} alt="profile" className="profileIcon" />
            {/* <i className="fa fa-user fa-6x profileIcon"></i> */}
            <div className="iconChoices">
              <button className="choice" onClick={changeProfile}>
                <img src={profile1} alt={profile1} />
              </button>
              <button className="choice" onClick={changeProfile}>
                <img src={profile2} alt="profile2" />
              </button>
              <button className="choice" onClick={changeProfile}>
                <img src={profile3} alt="profile3" />
              </button>
              <button className="choice" onClick={changeProfile}>
                <img src={profile4} alt="profile4" />
              </button>
              <button className="choice" onClick={changeProfile}>
                <img src={profile5} alt="profile5" />
              </button>
              <button className="choice" onClick={changeProfile}>
                <img src={profile6} alt="profile6" />
              </button>
            </div>
          </div>

        </form>
        <hr />
        <form className="editForm">
          <h3 className="editTitle">Personal Information</h3>
          <input name="username" type="text" placeholder="Username" id="user" />
          <input name="email" type="email" placeholder="someone@gmail.com" />
          <input name="firstname" type="text" placeholder="First Name" />
          <input name="lastname" type="text" placeholder="Last Name" />
          <input type="submit" value="Save Changes" />
        </form>
        <hr />
        <form className="editForm">
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
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
