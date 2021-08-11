import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'react-dropdown/style.css';
import App from "./App";
import Header from "./Header";
import reportWebVitals from "./reportWebVitals";
import OneSignal from 'react-onesignal';
import "./web.config";

OneSignal.initialize('32b3d194-341a-4b3e-b04e-e416ea3131f9', {
  autoRegister: true,
  autoResubscribe: true,
  persistNotification: true
});

ReactDOM.render(
  <React.StrictMode>
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
