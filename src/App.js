import React, { useState, Fragment, useEffect } from "react";
import Routes from "./components/routing/Routes";
import { Provider } from "react-redux";
import store from "./store";
import { I18Provider } from "./i18n";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { logoutUser, setCurrentUser, getMainPicture } from "./actions/userAction";
import setRequestHeader from "./components/common/setRequestHeader";
import jwt_decode from "jwt-decode";
import Settings from "./components/ui/Settings/Settings";
import Notiflix from "notiflix";

if (localStorage.jwtUserToken) {
  setRequestHeader("token", localStorage.jwtUserToken);
  const decode = jwt_decode(localStorage.jwtUserToken);
  store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem("companies"))));
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/signin";
  }
}

if (!sessionStorage.getItem("main_picture") || sessionStorage.getItem("main_picture") === "undefined") {
  getMainPicture().then((result) => {
    if (result !== null) {
      sessionStorage.setItem("main_picture", result);
    }
  })
}

function App() {
  var lang;
  if (localStorage.langCity) {
    lang = localStorage.getItem("langCity");
  }
  const [locale, setLocale] = useState(lang || process.env.REACT_APP_DEFAULT_LANG);

  Notiflix.Notify.init({
    className: "notiflix-notify pp-notiflix",
    rtl: true,
  });
  
  return (
    <Provider store={store}>
      <I18Provider locale={locale}>
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
