import React from "react";
import { Link, useHistory } from "react-router-dom";
import translate from "./../../../i18n/translate";

const SubNavOoredoo = ({ mobile }) => {
  const history = useHistory().location.pathname.split("/")[3];
  const historyPush = useHistory();
  console.log(history);
  return (
    <div>
      <div className=" d-flex justify-content-around sub-nav my-4 ">
        <div className="my-2">
          <button onClick={() => historyPush.push("/company/ooredoo/MobileNumer")} className="btn rom-selected ">
            {translate("Back")}
          </button>
        </div>
        <div className="my-3">
          <Link
            className={`link-main ${history === "credit" ? "active-sub" : ""}`}
            to={`/company/ooredoo/credit/${mobile}`}
          >
            {translate("etopup")}
          </Link>
        </div>
        <div className="my-3">
          {" "}
          <Link
            className={`link-main ${history === "minutes" ? "active-sub" : ""}`}
            to={`/company/ooredoo/minutes/${mobile}`}
          >
            {translate("minutes")}
          </Link>
        </div>
        <div className="my-3">
          {" "}
          <Link className={`link-main ${history === "3g" ? "active-sub" : ""}`} to={`/company/ooredoo/3g/${mobile}`}>
            {translate("ooredoo3g")}
          </Link>
        </div>
        <div className="my-3">
          {" "}
          <Link className={`link-main ${history === "rom" ? "active-sub" : ""}`} to={`/company/ooredoo/rom/${mobile}`}>
            {translate("Roaming")}
          </Link>
        </div>
        <div className="my-3">
          {" "}
          <Link
            className={`link-main ${history === "shabab" ? "active-sub" : ""}`}
            to={`/company/ooredoo/shabab/${mobile}`}
          >
            {translate("superShabab")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubNavOoredoo;
