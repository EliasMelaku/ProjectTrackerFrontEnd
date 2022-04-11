import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import "./nav.css";

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
        <Link to="/register" className="link">
          <li>Sign Up</li>
        </Link>
      </ul>
    );
  } else {
    loginStatus = (
      <div className="loginStatus">
        <Link to="/editProfile" className="link">
          <li>{localStorage.getItem('username')}</li>
        </Link>
        <button onClick={Logout}>
          <h5>Logout</h5>
        </button>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to={"/"}>
        <h3 className="navbar-brand">ProjectTracker</h3>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link disabled"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Disabled
            </a>
          </li>
        </ul>

        {loginStatus}
      </div>
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
