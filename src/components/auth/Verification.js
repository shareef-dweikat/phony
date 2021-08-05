import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { verfiyUser } from "./../../actions/userAction";
import Message from "./../common/Message";
import Notiflix from "notiflix";

const Verification = ({ verfiyUser, isAuthenticated, massage, mobile }) => {
  const history = useHistory();
  const [trialNo, setTrialNo] = useState(0);
  const intl = useIntl();

  const [virefyForm, setVirefyForm] = useState({
    virefy: "",
    mobile: "",
  });
  useEffect(() => {
    console.log(history.state);
    document.title = "PhonePlay//login";
    if (isAuthenticated) {
      history.push("/");
    }
  }, []);
  const onChange = (e) => {
    setVirefyForm({ ...virefyForm, [e.target.name]: e.target.value } );
  };
  const onSubmit = (e) => {
    // setTrialNo((...prev)=>...prev+1)
    e.preventDefault();
    if (virefyForm.mobile === history.location.state.mobile) {
      verfiyUser(history.location.pathname.split("/")[2], virefyForm,history);
    } else {
      console.log("errooooooooor");
      Notiflix.Notify.failure("Failure message text");
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
              <h2 className="welcome-text">{translate('confirmPls')}</h2>
            </div>
            <span className="guest-sign-in">
             {translate('weNeed')} (xxx)-xxx-xx
              {history.location.state.mobile.slice(8, 10)}
            </span>
            <div className="mt-3  ">
              <form onSubmit={(e) => onSubmit(e)}>
                {/* {massage !== null && massage !== "" && (
                  <Message msg={massage} />
                )} */}
                <div className="">
                  <div className="row mb-3 ">
                    <label className="col-sm-3 col-form-label">
                      {translate('code')}
                    </label>
                    <div className="row ">
                      <div className="col-sm-12">
                        <TextFieldGroup
                          style={{ width: "100%" }}
                          className="mb-5 "
                          placeholder="Enter the code"
                          name="virefy"
                          type="text"
                          value={virefyForm.verfiy}
                          onChange={onChange}
                          required={true}
                          autoFocus={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <label className="col-sm-3 col-form-label">
                      {translate('mobile')}
                    </label>
                    <div className="row ">
                      <div className="col-sm-12">
                        <TextFieldGroup
                          style={{ width: "100%" }}
                          className="mb-5 "
                          placeholder="Enter the Mobile Number "
                          name="mobile"
                          type="tel"
                          value={virefyForm.mobile}
                          onChange={onChange}
                          required={true}
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
                    >
                      {translate('Confirm')}
                    </button>
                  </div>
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
  massage: state.error.massage,
});

export default connect(mapStateToProps, { verfiyUser })(Verification);
