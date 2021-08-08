import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/userAction";
import validateForgotPasswordInput from "../../validation/validateForgotPasswordInput";
import Message from "../common/Message";
import Spinner from "../ui/spinner/Spinner";
import Logo from "../../assests/images/logo/black-logo.svg";
import LanguageChooser from "../ui/Language/LanguageChooser";

const ForgotPassword = ({ resetPassword, isAuthenticated, massage }) => {
  const history = useHistory();
  const intl = useIntl();
  useEffect(() => {
    document.title = "Forgot Password | PhonePlay";
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
    const { errors, isValid } = validateForgotPasswordInput(loginForm);
    if (!isValid) {
      setErrors1(errors);
      isLoading(false);
    } else {
      resetPassword(loginForm, history)
      .finally(() => {
        isLoading(false);
      });
    }
  };
  return (
    <section class="auth signin">
      <LanguageChooser/>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="card-wrapper">
            <div class="card fat">
              <div class="card-body">
                <div class="brand">
                  <img src={Logo} alt="logo"></img>
                </div>

                <h4 class="card-title text-center">{translate("Password reset request")}</h4>
                <p class="card-subtitle mt-3 mb-1">{translate("Enter your username and we will send you a confirmation code to your mobile number to create a new password.")}</p>

                {massage !== null && massage !== "" && massage !== undefined && <Message msg={massage} />}

                <form method="POST" class="forgot-validation mt-2" novalidate="" onSubmit={(e) => onSubmit(e)}>
                  <TextFieldGroup
                    style={{ width: "100%" }}
                    className="mb-5"
                    placeholder={intl.formatMessage({ id: "enter4" })}
                    name="userName"
                    type="number"
                    value={loginForm.userName}
                    onChange={onChange}
                    error={errors1.userName}
                    autoFocus={true}
                    label={translate("Username")}
                    required={true}
                  />

                  <div class="form-group mb-0 mt-4 actions">
                    <button type="submit" class="btn btn-primary btn-block" disabled={loading}>
                      {translate("Send Code")}
                    </button>
                  </div>

                  <div class="mt-4 text-center">
                    <a href="/signin"> {translate("Return to Sign in")}</a>
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
  massage: state.error.massage,
});
export default connect(mapStateToProps, { resetPassword })(ForgotPassword);
