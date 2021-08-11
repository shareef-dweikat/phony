import React, { useState, Fragment } from "react";

import Routes from "./components/routing/Routes";
import { Provider } from "react-redux";
import store from "./store";
import { I18Provider, LOCALES } from "./i18n";
import Navar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/homePage/Home";
import { logoutUser, setCurrentUser } from "./actions/userAction";
import setAuthToken from "./components/common/setAuthToken";
import PrivateRoute from "./components/common/PrivateRoute";
import jwt_decode from "jwt-decode";
import Settings from "./components/ui/Settings/Settings";

if (localStorage.jwtUserToken) {
  // Set Auth token header
  setAuthToken(localStorage.jwtUserToken);
  //decode token  and get user info
  const decode = jwt_decode(localStorage.jwtUserToken);
  //set user and isAuth
  store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem("companies")))); // u can dispatch any action u want to store
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    //logout the user
    store.dispatch(logoutUser());

    //Redirect to signin
    window.location.href = "/signin";
  }
}

function App() {
  var lang;
  if (localStorage.langCity) {
    lang = localStorage.getItem("langCity");
  }
  const [locale, setLocale] = useState(lang || LOCALES.ARABIC);

  return (
    <Provider store={store}>
      <I18Provider locale={locale}>
        <Settings />
        <Router>
          <Fragment>
            <Switch>
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </I18Provider>
    </Provider>
  );
}

export default App;
