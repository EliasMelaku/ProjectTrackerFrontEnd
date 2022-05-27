import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import "./nav.css";

import profile1 from "../pages/images/fem1.jpg";
import profile2 from "../pages/images/male1.jpg";
import profile3 from "../pages/images/fem2.jpg";
import profile4 from "../pages/images/male2.jpg";
import profile5 from "../pages/images/fem3.jpg";
import profile6 from "../pages/images/male3.jpg";

const Nav = () => {
  let loginStatus;
  const [LoginStatus, setLoginStatus] = useContext(LoginContext);
  var userLoggedIn = LoginStatus;

  let navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    setLoginStatus(false);
    navigate("/login", { replace: true });
  };

  if (!userLoggedIn) {
    loginStatus = (
      <ul className="loginStatus">
        <Link to="/login" className="link">
          <li>Login</li>
        </Link>
        <Link to="/register" className="link navReg">
          <li>Sign Up</li>
        </Link>
      </ul>
    );
  } else {
    loginStatus = (
      <ul className="loginStatus">
        <Link to="/editProfile" className="link">
        <div className="link userIcon">
          <img src={profile1} alt="usrProfile" />
          {/* <li>localStorage.getItem("username")</li> */}
          <li title="Your Profile">monkelicious</li>
        </div>
        </Link>
        <button onClick={Logout} className="link">
          <li title="Log Out"><i class="fa-solid fa-arrow-right-from-bracket"></i></li>
        </button>
      </ul>
    );
  }

  return (
    <nav className="myNav">
      <Link to={"/"}>
        <h3 className="navbar-brand">ProjectTracker</h3>
      </Link>

      <ul className="navlinkHolder">
        <li className="navLinks">
          <Link to={"/home"} className="link">
            Home
          </Link>
        </li>
        {/* <li className="navLinks">
          <Link to={"/projects"} className="link">
            Projects
          </Link>
        </li> */}
        <li className="navLinks">
          <Link to={"/newProject"} className="link">
            New Project
          </Link>
        </li>
      </ul>
      {loginStatus}
    </nav>
  );
};

export default Nav;

{
  /* <ul >
      <Link to="/">
        <li>Homepage</li>
      </Link>
      <Link to="/details">
        <li>Details</li>
      </Link>
      <Link to="/editProfile">
        <li>EditProfile</li>
      </Link>
    </ul> */
}
