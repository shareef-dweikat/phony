import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import Select from "../common/Select";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signUpUser, callIpApi, callGetSellerNumber } from "./../../actions/userAction";
import "./auth.css";
import validateSignUpInput from "../../validation/validateSignUpInput";
import Spinner from "../ui/spinner/Spinner";
import Logo from "../../assests/images/logo/black-logo.svg";
import { CITIES } from "./cities";
import { isNil } from "lodash";

const countries = [
  {value: "palestine", label: "Palestine"},
  {value: "israel", label: "Israel"},
]

const SignUp = ({ isAuthenticated, signUpUser }) => {
  const history = useHistory();
  const [ip, setIp] = useState(null);
  const [cities, setSities] = useState([]);

  useEffect(() => {
    document.title = "Sign up | Phone Play";
    if (isAuthenticated) {
      history.push("/");
    }
    if (!ip) {
      callIpApi()
      .then((info) => {
        setIp(info.ip);
      });
    }

    callGetSellerNumber().then((res) => {
      setSignUpForm({ ...signUpForm, username: res.data });
    });
  }, []);
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
    address: "",
    country: "",
    city: "",
    code: null,
  });
  const [errors1, setErrors1] = useState({});
  const [loading, isLoading] = useState(false);

  const intl = useIntl();
  const onChange = (e) => {
    if (e.target.name === "country" && e.target.value === "null") {
      return;
    }

    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    if (e.target.name === "country") {
      console.log(e.target.value);
      setSities(CITIES[e.target.value]);
      setSignUpForm({ ...signUpForm, city: ""});
    }
  };
  const onSubmit = (e) => {
    console.log(signUpForm);
    e.preventDefault();
    isLoading(true);

    const { errors, isValid } = validateSignUpInput(signUpForm);
    if (!isValid) {
      setErrors1(errors);
      isLoading(false);
    } else {
      signUpUser(signUpForm, ip, history)
      .finally(() => {
        isLoading(false);
      });
    }
  };
  return (
    <section class="auth signup">
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
                    placeholder={intl.formatMessage({ id: "Creating a username ..." })}
                    name="username"
                    type="text"
                    value={signUpForm.username}
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
                    onChange={onChange}
                  />

                  <Select
                    name="city"
                    placeholder={intl.formatMessage({ id: "enter5" })}
                    label={intl.formatMessage({ id: "City" })}
                    options={cities}
                    error={errors1.city}
                    required={true}
                    onChange={onChange}
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
