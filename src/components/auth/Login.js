import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/userAction";
import validateLoginInput from "../../validation/validateLoginInput";
import Message from "./../common/Message";
import Spinner from "../ui/spinner/Spinner";

const Login = ({ loginUser, isAuthenticated, massage }) => {
  const history = useHistory();
  const intl = useIntl();
  useEffect(() => {
    document.title = "PhonePlay/login";
    if (isAuthenticated) {
      history.push("/");
    }
  }, []);
  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });
  const [errors1, setErrors1] = useState({});
  const [loading, isLoading] = useState(false);

  const onChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    isLoading(true);
    e.preventDefault();
    const { errors, isValid } = validateLoginInput(loginForm);
    if (!isValid) {
      setErrors1(errors);
      console.log("Errors=> ", errors);
      isLoading(false);
    } else {
      loginUser(loginForm, history, turnOffLoader);
    }
  };
  const turnOffLoader = () => {
    isLoading(false);
  }
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
            <span className="guest-sign-in">{translate("signToCity")}</span>
            <div className="mt-3  ">
              <form onSubmit={(e) => onSubmit(e)}>
                {massage !== null &&
                  massage !== "" &&
                  massage !== undefined && <Message msg={massage} />}
                <div className="">
                  <div className="row mb-3 ">
                    <label className="col-sm-2 col-form-label">
                      {translate("userName")}
                    </label>
                    <div className="row ">
                      <div className="col-sm-12">
                        <TextFieldGroup
                          style={{ width: "100%" }}
                          className="mb-5 "
                          placeholder={intl.formatMessage({ id: "enter4" })}
                          name="userName"
                          type="number"
                          value={loginForm.userName}
                          onChange={onChange}
                          error={errors1.userName}
                          autoFocus={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                      {translate("password")}
                    </label>
                    <div className="row">
                      <div className="col-sm-12">
                        <TextFieldGroup
                          style={{ width: "100%" }}
                          placeholder={intl.formatMessage({ id: "password" })}
                          name="password"
                          type="password"
                          value={loginForm.password}
                          onChange={onChange}
                          error={errors1.password}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-col-12s ">
                    <button
                      className="btn sign-but mb-5 "
                      type="submit"
                      id="reg"
                      style={{ width: "20%" }}
                      disabled={loading}
                    >
                      {translate("login")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loading && (<Spinner/>)}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  massage: state.error.massage,
});
export default connect(mapStateToProps, { loginUser })(Login);
