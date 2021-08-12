import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'react-dropdown/style.css';
import App from "./App";
import Header from "./Header";
import reportWebVitals from "./reportWebVitals";
import OneSignal from 'react-onesignal';
import "./web.config";
import { Helmet } from 'react-helmet'

OneSignal.initialize(process.env.REACT_APP_ONE_SIGNAL_APP_ID, {
  autoRegister: true,
  autoResubscribe: true,
  allowLocalhostAsSecureOrigin: process.env.REACT_APP_ONE_SIGNAL_ALLOW_LOCAL,
  subdomainName: process.env.REACT_APP_ONE_SIGNAL_SUBDOMAIN,
  safari_web_id: process.env.REACT_APP_ONE_SIGNAL_SAFARI_WEB_ID,
});

const TITLE = process.env.REACT_APP_SITE_TITLE;

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <title>{ TITLE }</title>
    </Helmet>
    <Header />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
const body = document.getElementsByTagName("body")[0];
if (localStorage.langCity === "en") {
  body.setAttribute("dir", "ltr");
  body.setAttribute("lang", "en");
  body.classList.add("english");
} else if (!localStorage.langCity) {
  body.setAttribute("dir", "rtl");
  body.setAttribute("lang", "ar");
  body.classList.add("arabic");
} else {
  body.setAttribute("dir", "rtl");
  body.setAttribute("lang", "ar");
  body.classList.add("arabic");
}

// reportWebVitals(console.log);
