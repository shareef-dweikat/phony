import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword, callResendCode } from "./../../actions/userAction";
import Message from "./../common/Message";
import Spinner from "../ui/spinner/Spinner";
import Logo from "../../assests/images/logo/black-logo.svg";
import validateResetPasswordInput from "../../validation/validateResetPasswordInput";
import Countdown from 'react-countdown';
import humanizeDuration from "humanize-duration";
import { Button } from "react-bootstrap";
import classnames from "classnames";

const ResetPassword = ({ resetPassword, callResendCode, isAuthenticated, massage, mobile }) => {
  const history = useHistory();
  const [trialNo, setTrialNo] = useState(0);
  const intl = useIntl();

  const [virefyForm, setVirefyForm] = useState({
    random_number: "",
    password: "",
    password2: "",
    seller_id: history.location.state.sellerId,
    last_4_digit: history.location.state.last4Digit,
  });
  const [errors1, setErrors1] = useState({});
  const [loading, isLoading] = useState(false);
  const [timer, setTimer] = useState(180000);

  useEffect(() => {
    console.log(history.state);
    document.title = "Reset Password | Phone Play";
    if (isAuthenticated) {
      history.push("/");
    }
  }, []);
  const onChange = (e) => {
    setVirefyForm({ ...virefyForm, [e.target.name]: e.target.value } );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    isLoading(true);

    const { errors, isValid } = validateResetPasswordInput(virefyForm);
    if (!isValid) {
      setErrors1(errors);
      isLoading(false);
    } else {
      resetPassword(virefyForm, history)
      .finally(() => {
        isLoading(false);
      });
    }
  };

  const _updateTimer = (props) => {
    setTimer(props.total);
  }
  const _resendCode = () => {
    if (timer == 0) {
      setTimer(180000);
      callResendCode(virefyForm.seller_id);
    }
  }
  return (
    <section class="auth reset-password">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="card-wrapper">
            <div class="card fat">
              <div class="card-body">
                <div class="brand">
                  <img src={Logo} alt="logo"></img>
                </div>
                <h4 class="card-title text-center">
                  {translate('We sent you a confirmation code to your mobile number')}<br/>
                  <span className="mobile-number">(xxx)-xxx-{virefyForm?.last_4_digit}</span>
                </h4>

                <h6 class="card-subtitle text-center text-muted pb-0">
                  <Button variant="link" className="py-0 px-1" onClick={_resendCode} disabled={timer != 0}>
                    {translate("Resend code")}
                  </Button>
                  <Countdown
                    date={Date.now() + timer}
                    onTick={_updateTimer}
                    onComplete={_updateTimer}
                    renderer={props => (
                      <span className={classnames({"hidden": timer == 0})}>
                        ({humanizeDuration(props.total, {language: intl.locale, units: ['m', 's']})})
                      </span>
                    )}
                  />
                </h6>

                {massage !== null && massage !== "" && massage !== undefined && <Message msg={massage} />}

                <form method="POST" class="verification-validation" novalidate="" onSubmit={(e) => onSubmit(e)}>
                  <TextFieldGroup
                    style={{ width: "100%" }}
                    className="mb-5 "
                    placeholder={intl.formatMessage({ id: "Enter the confirmation code" })}
                    name="random_number"
                    type="text"
                    value={virefyForm.random_number}
                    error={errors1.random_number}
                    onChange={onChange}
                    required={true}
                    autoFocus={true}
                    label={translate("Confirmation code")}
                  />
                  
                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "Password" })}
                    name="password"
                    type="password"
                    value={virefyForm.password}
                    onChange={onChange}
                    error={errors1.password}
                    label={translate("Password")}
                    required={true}
                  />

                  <TextFieldGroup
                    placeholder={intl.formatMessage({ id: "Confirm password" })}
                    name="password2"
                    type="password"
                    value={virefyForm.password2}
                    onChange={onChange}
                    error={errors1.password2}
                    label={translate("Confirm password")}
                    required={true}
                  />

                  <div class="form-group mb-0 mt-4 actions">
                    <button type="submit" class="btn btn-primary btn-block" disabled={loading}>
                    {translate("Confirm")}
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

export default connect(mapStateToProps, { resetPassword, callResendCode })(ResetPassword);
