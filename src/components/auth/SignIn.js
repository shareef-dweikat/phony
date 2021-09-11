import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import TextFieldGroup from "../common/TextFieldGroup";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { loginUser, callIpApi, logoutUser } from "../../actions/userAction";
import validateLoginInput from "../../validation/validateLoginInput";
import Message from "../common/Message";
import Spinner from "../ui/spinner/Spinner";
import Logo from "../../assests/images/logo/black-logo.svg";
import ReCAPTCHA from 'reaptcha';
import LanguageChooser from "../ui/Settings/Language/LanguageChooser";

const SignIn = ({ loginUser, isAuthenticated, massage }) => {
  const history = useHistory();
  const intl = useIntl();
  const [ip, setIp] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Sign In | Phone Play";
    if (isAuthenticated && history.location.search !== '?token-expired') {
      history.push("/");
    } else if( history.location.search == '?token-expired') {
          dispatch(logoutUser(history))
    }
    if (!ip) {
      callIpApi()
      .then((info) => {
        setIp(info.ip);
      });
    }
    // window.addEventListener("popstate", e => {
    //   // Nope, go back to your page
    //   this.props.history.go(1);
    // });
    window.onpopstate = () => setTimeout(()=>{
     history.go(1);
    }, 0);

    // window.addEventListener("load", function(event) { 
    //   //console.log("The page is redirecting")  
    //  alert('The page is redirecting')         
     
    // });
    if(parseInt(localStorage.getItem('errorCount')) && parseInt(localStorage.getItem('errorCount')) != errorCount) {
      setErrorCount(parseInt(localStorage.getItem('errorCount')))
    }
  }, []);
  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });
  const [errors1, setErrors1] = useState({});
  const [errorCount, setErrorCount] = useState(0);
  const [loading, isLoading] = useState(false);
  const [passwordChanged, isPasswordChanged] = useState(history.location?.state?.password_changed);

  const onChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    isLoading(true);
    e.preventDefault();
    const { errors, isValid } = validateLoginInput(loginForm);
    if (!isValid) {
      setErrors1(errors);
      isLoading(false);
    } else {
      loginUser(loginForm, ip, history, errorCount)
      .finally(() => {
        setErrorCount(errorCount + 1)
        // localStorage.setItem('errorCount', errorCount + 1)
        isLoading(false);
      });
    }
  };
  function verfiy() {
   setErrorCount(0)
   localStorage.setItem('errorCount', 0)
  }
  console.log(errorCount, "errrorr")
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
                <h4 class="card-title text-center">{translate("Sign in to your account")}</h4>

                {massage !== null && massage !== "" && massage !== undefined && <Message msg={massage} />}
                {passwordChanged && !massage && <Message msg={intl.formatMessage({ id: "Your password changed successfully, you can login now with the new password" })} type="success"/>}

                <form method="POST" class="login-validation" novalidate="" onSubmit={(e) => onSubmit(e)}>
                  <TextFieldGroup
                    style={{ width: "100%" }}
                    className="mb-5"
                    placeholder={intl.formatMessage({ id: "Enter your username" })}
                    name="userName"
                    type="number"
                    value={loginForm.userName}
                    onChange={onChange}
                    error={errors1.userName}
                    autoFocus={true}
                    label={translate("Username")}
                    required={true}
                  />

                  <TextFieldGroup
                    style={{ width: "100%" }}
                    placeholder={intl.formatMessage({ id: "Password" })}
                    name="password"
                    type="password"
                    value={loginForm.password}
                    onChange={onChange}
                    error={errors1.password}
                    label={translate("Password")}
                    link={{
                      url: "/forgot-password",
                      text: translate("Forgot Password?")
                    }}
                    required={true}
                  />
                 {errorCount < 3 &&
                    <div class="form-group mb-0 mt-4 actions">
                      <button type="submit" class="btn btn-primary btn-block" disabled={loading}>
                      {translate("Sign in")}
                      </button>
                    </div>
                  }
                  {errorCount >= 3 &&
                  <div class="form-group mb-0 mt-4 actions">
                    <ReCAPTCHA
                      sitekey='6Lc3pTQcAAAAAFNk2I_TtP0YpP747ssgI1fvGey5'
                      onVerify={verfiy}
                    />
                  </div>}
                  <LanguageChooser />
                </form>
              </div>
             
            </div>
            <div class="mt-4 text-center">
              {translate("Don't have an account?")} <a href="/signup">{translate("Sign Up")}</a>
            </div>
              <div style={{textAlign: 'center'}}>
              0.0.3 V
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
export default connect(mapStateToProps, { loginUser })(SignIn);
