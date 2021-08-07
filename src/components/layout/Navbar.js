import React, { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link, useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import { logoutUser } from "./../../actions/userAction";
import { connect } from "react-redux";
import { userData } from "../../actions/userAction";
import "./nav.css";
import logo from "../../assests/images/logo/white-logo.svg";
import Dropdown from 'react-dropdown';

const options = [
  { value: 'default', label: translate('Default') },
  { value: 'column3', label: translate('column3') },
  { value: 'column4', label: translate('column4') },
  { value: 'column6', label: translate('column6') },
];

const Navbar = ({ isAuthenticated, logoutUser, userData }) => {
  const history = useHistory();
  const [selected, setSelected] = useState("PS");

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(()=>   userData() ,1000)
    }
    if (localStorage.langCity === "en") {
      setSelected("US");
    } else if (localStorage.langCity === "is") {
      setSelected("IL");
    }
  }, []);
  const onSelectLang = (code) => {
    console.log("code", code);
    if (code === "US") {
      localStorage.langCity = "en";
    } else if (code === "PS") {
      localStorage.langCity = "ar";
    } else {
      localStorage.langCity = "is";
    }
    window.location.reload();
  };
  const onLogoutClick = () => {
    logoutUser(history);
  };
  const getDefaultSize = () => {
    return options.find((op) => op.value === localStorage.size);
  }
  const _onSelectSize = (e) => {
    localStorage.setItem("size", e.value);
    window.location.reload();
  }
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
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link active" to="/signUp">
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

          <Dropdown options={options} onChange={_onSelectSize} value={getDefaultSize()} placeholder="Size" className='style1'/>

          <ReactFlagsSelect
            color={"#fff"}
            countries={["PS", "US", "IL"]}
            selected={selected}
            customLabels={{ US: "English", PS: "Arabic", IL: "Hebrew" }}
            onSelect={(code) => onSelectLang(code)}
            selectedSize={14}
            optionsSize={14}
            showLabal={true}
            className="custom-lang"
          />
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logoutUser, userData })(Navbar);
