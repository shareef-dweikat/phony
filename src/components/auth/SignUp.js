import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signUpUser } from "./../../actions/userAction";
import axios from "axios";
import "./auth.css";
import validateSignUpInput from "../../validation/validateSignUpInput";
const SignUp = ({ isAuthenticated, signUpUser }) => {
  const history = useHistory();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    document.title = "PhonePlay/Sign up";
    if (isAuthenticated) {
      history.push("/");
    }
    axios.post("http://api.phoneplay.me/api/v1/resources/getsellerno").then((res) => {
      console.log(res.data);
      setUserName(res.data);
    });
  }, []);
  const [signUpForm, setSignUpForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
    address: "",
    country: "palestine",
    city: "",
    code: null,
  });
  const [errors1, setErrors1] = useState({});

  const intl = useIntl();
  const onChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateSignUpInput(signUpForm);
    if (!isValid) {
      setErrors1(errors);
    } else {
      signUpUser(signUpForm, userName, history);
    }
  };
  return (
    <div>
      <section className="hero1">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-12"></div>
          </div>

          <div className="col-md-12 text-center d-flex justify-content-center"></div>
        </div>
      </section>
      <div className="login-body">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 text-center">
            <div className="row">
              <div className="p-col-3">
                <img
                  src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619824642/icon-login_df0nqj.svg"
                  alt="avalon-layout"
                />
              </div>
            </div>
            <div className="p-col-9">
              <h2 className="welcome-text">{translate("wellcome")}</h2>
            </div>
            <span className="guest-sign-in">{translate("signUpToCity")}</span>

            <div className="mt-3  ">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="  text-left m-4">
                  <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label mt-2">
                      {translate("userName")}
                    </label>
                    <div className="col-sm-7">
                      <label for="inputEmail3" className="col-form-label" style={{ fontSize: "1.5rem" }}>
                        {userName}
                      </label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">
                      {translate("fullname")}
                    </label>
                    <div className="col-sm-7">
                      <TextFieldGroup
                        className="mb-5"
                        placeholder={intl.formatMessage({ id: "enter0" })}
                        name="fullName"
                        value={signUpForm.fullName}
                        onChange={onChange}
                        error={errors1.fullName}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">
                      {translate("mobileNumber")}
                    </label>
                    <div className="col-sm-7">
                      <TextFieldGroup
                        placeholder={intl.formatMessage({ id: "enter2" })}
                        name="mobile"
                        type="number"
                        value={signUpForm.mobile}
                        onChange={onChange}
                        error={errors1.mobile}
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <input
                      class="form-check-input col m-2"
                      type="radio"
                      name="country"
                      id="inlineRadio1"
                      value="palestine"
                      onChange={onChange}
                      checked
                    />
                    <label class="form-check-label col m-1" for="inlineRadio1">
                      {translate("palestine")}
                    </label>
                    <input
                      class="form-check-input col m-2"
                      type="radio"
                      name="country"
                      id="inlineRadio1"
                      value="israel"
                      onChange={onChange}
                    />
                    <label class="form-check-label col m-1" for="inlineRadio1">
                      {translate("isreal")}
                    </label>
                  </div>
                  <div className="row mb-3  mt-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">
                      {translate("City")}
                    </label>
                    <div className="col-sm-7">
                      <TextFieldGroup
                        className="mb-5"
                        name="city"
                        value={signUpForm.city}
                        onChange={onChange}
                        error={errors1.city}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">
                      {translate("address")}
                    </label>
                    <div className="col-sm-7">
                      <TextFieldGroup
                        className="mb-5"
                        placeholder={intl.formatMessage({ id: "enter3" })}
                        name="address"
                        value={signUpForm.address}
                        onChange={onChange}
                        // error={errors1.address}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">
                      {translate("password")}
                    </label>
                    <div className="col-sm-7">
                      <TextFieldGroup
                        placeholder={intl.formatMessage({ id: "password" })}
                        name="password"
                        type="password"
                        value={signUpForm.password}
                        onChange={onChange}
                        error={errors1.password}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">
                      {translate("confirmPassword")}
                    </label>

                    <div className="col-sm-7">
                      <TextFieldGroup
                        placeholder={intl.formatMessage({
                          id: "confirmPassword",
                        })}
                        name="password2"
                        type="password"
                        value={signUpForm.password2}
                        onChange={onChange}
                        error={errors1.password2}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">
                      {translate("email")}
                    </label>
                    <div className="col-sm-7">
                      <TextFieldGroup
                        placeholder={intl.formatMessage({ id: "enter1" })}
                        name="email"
                        type="email"
                        value={signUpForm.email}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputEmail3" className="col-sm-3 col-form-label">
                      Rererral Code
                    </label>
                    <div className="col-sm-7">
                      <TextFieldGroup
                        className="mb-5"
                        // placeholder={intl.formatMessage({ id: "enter0" })}
                        name="code"
                        value={signUpForm.code}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-7 text-center">
                      <button className="btn sign-but " type="submit" style={{ width: "100%" }}>
                        {translate("register1")}
                      </button>
                    </div>
                  </div>
                  <label for="inputEmail3" className=" col-form-label">
                    {translate("haveAccount")}
                  </label>{" "}
                  <Link to="/login">{translate("login")}</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { signUpUser })(SignUp);
