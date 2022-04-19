import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./css/editProfile.css";



import profile1 from "./images/fem1.jpg";
import profile2 from "./images/male1.jpg";
import profile3 from "./images/fem2.jpg";
import profile4 from "./images/male2.jpg";
import profile5 from "./images/fem3.jpg";
import profile6 from "./images/male3.jpg";


const EditProfile = () => {
  const [selectedProfile, setProfile] = useState("");
  
  useEffect(() => {
    setProfile(profile2);
  }, [])


  return (
    <div className="editProfileContainer">
      <form className="editForm">
        <h2 className="editTitle">Edit your profile</h2>
        <div className="iconrow">
          <img src={selectedProfile} alt="fem1" className="profileIcon" />
          {/* <i className="fa fa-user fa-6x profileIcon"></i> */}
          <div className="iconChoices">
            <img src={profile1} alt="choice1" className="choice" />
            <img src={profile2} alt="choice2" className="choice" />
            <img src={profile3} alt="choice3" className="choice" />
            <img src={profile4} alt="choice4" className="choice" />
            <img src={profile5} alt="choice5" className="choice" />
            <img src={profile6} alt="choice6" className="choice" />
          </div>
        </div>
        <input name="username" type="text" placeholder="Username" id="user" />
        <div className="namesContainer">
          <div className="names">
            <input name="firstname" type="text" placeholder="First Name" />
          </div>
          <div className="names">
            <input name="lastname" type="text" placeholder="Last Name" />
          </div>
        </div>
        <input name="email" type="email" placeholder="someone@gmail.com" />
        <input name="password" type="password" placeholder="Password" />
        <input
          name="cPassword"
          type="password"
          placeholder="Confirm Password"
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default EditProfile;
