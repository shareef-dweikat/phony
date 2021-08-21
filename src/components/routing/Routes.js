import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import ForgotPassword from "../auth/ForgotPassword";
import Verification from "../auth/Verification";
import SignUpVerification from "../auth/SignUpVerification";
import { useIntl } from 'react-intl';
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import ResetPassword from "../auth/ResetPassword";

const Routes = ({ user }) => {
  const intl = useIntl();

  return (
    <Switch>
      {!user && (<Route exact path="/" component={SignIn} />)}
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/verification/:id" component={Verification} />
      <Route exact path="/signup-verification" component={SignUpVerification} />

      <Route component={AuthenticatedRoutes} />
    </Switch>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(Routes);
