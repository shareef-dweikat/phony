import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "./../../actions/userAction";
import { connect } from "react-redux";
import { userData } from "../../actions/userAction";
import "./nav.css";
import logo from "../../assests/images/logo/white-logo.svg";
import translate from "../../i18n/translate";

const Navbar = ({ isAuthenticated, logoutUser, userData }) => {
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(()=>   userData() ,1000)
    }
  }, []);
  const onLogoutClick = () => {
    logoutUser(history);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#25ace3" }}>
      <div className="container">
        <Link className="navbar-brand my-0 p-0" to="/">
          <div className="nav-imsg">
            <img
              width="auto"
              height="60"
              alt=""
              src={logo}
              className="d-inline-block align-top "
              alt=""
            />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div id="notification-section"></div>
            </li>

            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link active" to="/signup">
                  {translate("signUp")}
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link active" to="/signin">
                  {translate("login")}
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  style={{ cursor: "pointer" }}
                  onClick={onLogoutClick}
                  // href="signin"
                >
                  {translate("logout")}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logoutUser, userData })(Navbar);
