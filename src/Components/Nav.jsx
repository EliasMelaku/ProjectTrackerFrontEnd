import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import "./css/nav.css";

const Nav = () => {
  let loginStatus;
  let otherNav;
  const [LoginStatus, setLoginStatus] = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      setLoginStatus(true)
    }
  }, [LoginStatus]);
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
    otherNav = null;
  } else {
    loginStatus = (
      <ul className="loginStatus">
        <Link to="/editProfile" className="link">
          <div className="link userIcon">
            <img
              src={require("../pages/images/" +
                localStorage.getItem("profile") +
                ".jpg")}
              alt="usrProfile"
            />
            {/* <li>localStorage.getItem("username")</li> */}
            <li title="Your Profile">{localStorage.getItem("username")}</li>
          </div>
        </Link>
        <button onClick={Logout} className="link">
          <li title="Log Out">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </li>
        </button>
      </ul>
    );
    otherNav = (
      <ul className="navlinkHolder">
        <li className="navLinks">
          <Link to={"/home"} className="link">
            Home
          </Link>
        </li>
        <li className="navLinks">
          <Link to={"/completedProjects"} className="link">
            Finished Projects
          </Link>
        </li>
        <li className="navLinks">
          <Link to={"/otherProjects"} className="link">
            Other Projects
          </Link>
        </li>
        <li className="navLinks">
          <Link to={"/newProject"} className="link">
            New Project
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="myNav">
      <Link to={"/"}>
        <h3 className="navbar-brand">ProjectTracker</h3>
      </Link>
      {otherNav}
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
