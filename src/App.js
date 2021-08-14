import React, { useState, Fragment } from "react";
import Routes from "./components/routing/Routes";
import { Provider } from "react-redux";
import store from "./store";
import { I18Provider } from "./i18n";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { logoutUser, setCurrentUser } from "./actions/userAction";
import setRequestHeader from "./components/common/setRequestHeader";
import jwt_decode from "jwt-decode";
import Settings from "./components/ui/Settings/Settings";

if (localStorage.jwtUserToken) {
  // Set Auth token header
  setRequestHeader("Authorization", localStorage.jwtUserToken);
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
    // window.open("/signin");
    window.location.href = "/signin";
  }
}

if (localStorage._webPushUserHash) {
  setRequestHeader("X-Identifier", localStorage._webPushUserHash);
}

function App() {
  var lang;
  if (localStorage.langCity) {
    lang = localStorage.getItem("langCity");
  }
  const [locale, setLocale] = useState(lang || process.env.REACT_APP_DEFAULT_LANG);

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
