import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { verfiySignUpUser } from "../../actions/userAction";
import Message from "../common/Message";
import Notiflix from "notiflix";
import Spinner from "../ui/spinner/Spinner";
import Logo from "../../assests/images/logo/black-logo.svg";
import validateSignUpVerificationInput from "../../validation/validateSignUpVerificationInput";

const SignUpVerification = ({ verfiySignUpUser, isAuthenticated, massage }) => {
  const history = useHistory();
  const intl = useIntl();

  const [virefyForm, setVirefyForm] = useState({
    verificationCode: "",
    mobile: history.location?.state?.mobile,
    sellerId: history.location?.state?.sellerId,
  });
  const [errors1, setErrors1] = useState({});
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign Up | Phone Play";
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

    const { errors, isValid } = validateSignUpVerificationInput(virefyForm);
    if (!isValid) {
      if (errors.general) {
        Notiflix.Notify.failure("You need to sign up again.");
      }  
      setErrors1(errors);
      isLoading(false);
    } else {
      verfiySignUpUser(virefyForm, history)
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
                <h4 class="card-title text-center">
                  {translate('weNeed')} <br/> (xxx)-xxx-xx{history.location?.state?.mobile.slice(8, 10)}
                </h4>

                {massage !== null && massage !== "" && massage !== undefined && <Message msg={massage} />}

                <form method="POST" class="verification-validation" novalidate="" onSubmit={(e) => onSubmit(e)}>
                  <TextFieldGroup
                    style={{ width: "100%" }}
                    className="mb-5 "
                    placeholder={intl.formatMessage({ id: "Enter the confirmation code" })}
                    name="verificationCode"
                    type="text"
                    value={virefyForm.verificationCode}
                    error={errors1.verificationCode}
                    onChange={onChange}
                    required={true}
                    autoFocus={true}
                    label={translate("code")}
                  />

                  <div class="form-group mb-0 mt-4 actions">
                    <button type="submit" class="btn btn-primary btn-block" disabled={loading}>
                      {translate("Confirm")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="mt-4 text-center">
              {translate("haveAccount")} <a href="/signin">{translate("Sign in")}</a>
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

export default connect(mapStateToProps, { verfiySignUpUser })(SignUpVerification);
