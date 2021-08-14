import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'react-dropdown/style.css';
import App from "./App";
import Header from "./Header";
import "./web.config";
import { Helmet } from 'react-helmet'

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
