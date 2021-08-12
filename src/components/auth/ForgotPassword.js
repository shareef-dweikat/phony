import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/userAction";
import validateForgotPasswordInput from "../../validation/validateForgotPasswordInput";
import Message from "../common/Message";
import Spinner from "../ui/spinner/Spinner";
import Logo from "../../assests/images/logo/black-logo.svg";

const ForgotPassword = ({ forgotPassword, isAuthenticated, massage }) => {
  const history = useHistory();
  const intl = useIntl();
  useEffect(() => {
    document.title = "Forgot Password | Phone Play";
    if (isAuthenticated) {
      history.push("/");
    }
  }, []);
  const [forgotPassowrdForm, setForgotPasswordForm] = useState({
    userName: "",
    last4Digit: "",
  });
  const [errors1, setErrors1] = useState({});
  const [loading, isLoading] = useState(false);

  const onChange = (e) => {
    setForgotPasswordForm({ ...forgotPassowrdForm, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    isLoading(true);
    e.preventDefault();
    const { errors, isValid } = validateForgotPasswordInput(forgotPassowrdForm);
    if (!isValid) {
      setErrors1(errors);
      isLoading(false);
    } else {
      forgotPassword(forgotPassowrdForm, history)
      .finally(() => {
        isLoading(false);
      });
    }
  };
  return (
    <section class="auth signin">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="card-wrapper">
            <div class="card fat">
              <div class="card-body">
                <div class="brand">
                  <img src={Logo} alt="logo"></img>
                </div>

                <h4 class="card-title text-center">{translate("Password reset request")}</h4>
                <p class="card-subtitle mt-3 mb-1">{translate("Enter your below information and we will send you a confirmation code to your mobile number to create a new password.")}</p>

                {massage !== null && massage !== "" && massage !== undefined && <Message msg={massage} />}

                <form method="POST" class="forgot-validation mt-2" novalidate="" onSubmit={(e) => onSubmit(e)}>
                  <TextFieldGroup
                    style={{ width: "100%" }}
                    className="mb-5"
                    placeholder={intl.formatMessage({ id: "enter4" })}
                    name="userName"
                    type="number"
                    value={forgotPassowrdForm.userName}
                    onChange={onChange}
                    error={errors1.userName}
                    autoFocus={true}
                    label={translate("Username")}
                    required={true}
                  />

                  <TextFieldGroup
                    style={{ width: "100%" }}
                    className="mb-5"
                    placeholder={intl.formatMessage({ id: "Enter the last 4 digits of your mobile number" })}
                    name="last4Digit"
                    type="number"
                    value={forgotPassowrdForm.last4Digit}
                    onChange={onChange}
                    error={errors1.last4Digit}
                    label={translate("Last 4 digits")}
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
export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
