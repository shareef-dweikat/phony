import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import Select from "../common/Select";
import { useIntl } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signUpUser } from "./../../actions/userAction";
import axios from "axios";
import "./auth.css";
import validateSignUpInput from "../../validation/validateSignUpInput";
import Message from "./../common/Message";
import Spinner from "../ui/spinner/Spinner";
import Logo from "../../assests/images/logo/black-logo.svg";
import LanguageChooser from "../ui/Language/LanguageChooser";

const countries = [
  {value: "palestine", label: "Palestine"},
  {value: "israel", label: "Israel"},
]

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
  const [loading, isLoading] = useState(false);

  const intl = useIntl();
  const onChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    isLoading(true);

    const { errors, isValid } = validateSignUpInput(signUpForm);
    if (!isValid) {
      setErrors1(errors);
      isLoading(false);
    } else {
      signUpUser(signUpForm, userName, history)
      .finally(() => {
        isLoading(false);
      });
    }
  };
  return (
    <section class="auth signup">
      <LanguageChooser/>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="card-wrapper">
            <div class="card fat">
              <div class="card-body">
                <div class="brand">
                  <img src={Logo} alt="logo"></img>
                </div>
                <h4 class="card-title text-center">{translate("Create your free account")}</h4>
                <h6 class="card-subtitle text-center">{translate("haveAccount")} <a href="/signin">{translate("Sign in")}</a></h6>
                
                <form method="POST" class="signup-validation" novalidate="" onSubmit={(e) => onSubmit(e)}>

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "You will be provided with your username" })}
                    name="username"
                    type="text"
                    label={translate("Username")}
                    disable={true}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "enter0" })}
                    name="fullName"
                    type="text"
                    value={signUpForm.fullName}
                    onChange={onChange}
                    error={errors1.fullName}
                    autoFocus={true}
                    label={translate("fullname")}
                    required={true}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "enter2" })}
                    name="mobile"
                    type="number"
                    value={signUpForm.mobile}
                    onChange={onChange}
                    error={errors1.mobile}
                    label={translate("mobileNumber")}
                    required={true}
                  />

                  <Select
                    name="country"
                    placeholder={intl.formatMessage({ id: "Select a country" })}
                    label={intl.formatMessage({ id: "Enter your country" })}
                    options={countries}
                    error={errors1.country}
                    required={true}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "enter5" })}
                    name="city"
                    type="text"
                    value={signUpForm.city}
                    onChange={onChange}
                    error={errors1.city}
                    label={translate("City")}
                    required={true}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "enter3" })}
                    name="address"
                    type="text"
                    value={signUpForm.address}
                    onChange={onChange}
                    error={errors1.address}
                    label={translate("address")}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "password" })}
                    name="password"
                    type="password"
                    value={signUpForm.password}
                    onChange={onChange}
                    error={errors1.password}
                    label={translate("password")}
                    required={true}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "confirmPassword" })}
                    name="password2"
                    type="password"
                    value={signUpForm.password2}
                    onChange={onChange}
                    error={errors1.password2}
                    label={translate("confirmPassword")}
                    required={true}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "enter1" })}
                    name="email"
                    type="email"
                    value={signUpForm.email}
                    onChange={onChange}
                    error={errors1.email}
                    label={translate("email")}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "Enter Rererral Code" })}
                    name="code"
                    type="text"
                    value={signUpForm.code}
                    onChange={onChange}
                    error={errors1.code}
                    label={translate("Rererral Code")}
                  />
                  
                  <div class="form-group mb-0 mt-4 actions">
                    <button type="submit" class="btn btn-primary btn-block" disabled={loading}>
                    {translate("register1")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (<Spinner/>)}
    </section>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { signUpUser })(SignUp);
