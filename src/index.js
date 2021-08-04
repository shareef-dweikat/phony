import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./Header";
import reportWebVitals from "./reportWebVitals";

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
