import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { verfiyUser } from "./../../actions/userAction";
import Message from "./../common/Message";
import Notiflix from "notiflix";
import Spinner from "../ui/spinner/Spinner";
import Logo from "../../assests/images/logo/black-logo.svg";

const Verification = ({ verfiyUser, isAuthenticated, massage, mobile }) => {
  const history = useHistory();
  const [trialNo, setTrialNo] = useState(0);
  const intl = useIntl();

  const [virefyForm, setVirefyForm] = useState({
    virefy: "",
    mobile: history.location.state.mobile,
  });
  const [errors1, setErrors1] = useState({});
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    console.log(history.state);
    document.title = "Sign In | Phone Play";
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
    if (virefyForm.mobile === history.location.state.mobile) {
      verfiyUser(history.location.pathname.split("/")[2], virefyForm,history)
      .finally(() => {
        isLoading(false);
      });
    } else {
      Notiflix.Notify.failure("Validation Error");
      isLoading(false);
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
                  {translate('weNeed')} <br/> (xxx)-xxx-xx{history.location.state.mobile.slice(8, 10)}
                </h4>

                {massage !== null && massage !== "" && massage !== undefined && <Message msg={massage} />}

                <form method="POST" class="verification-validation" novalidate="" onSubmit={(e) => onSubmit(e)}>
                  <TextFieldGroup
                    style={{ width: "100%" }}
                    className="mb-5 "
                    placeholder={intl.formatMessage({ id: "Enter the confirmation code" })}
                    name="virefy"
                    type="text"
                    value={virefyForm.verfiy}
                    onChange={onChange}
                    required={true}
                    autoFocus={true}
                    label={translate("code")}
                  />

                  <div class="form-group mb-0 mt-4 actions">
                    <button type="submit" class="btn btn-primary btn-block" disabled={loading}>
                    {translate("Sign in")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="mt-4 text-center">
              {translate("Don't have an account?")} <a href="/signup">{translate("Sign up")}</a>
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

export default connect(mapStateToProps, { verfiyUser })(Verification);
