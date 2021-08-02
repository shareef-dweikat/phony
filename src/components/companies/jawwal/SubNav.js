import React from "react";
import { Link, useHistory } from "react-router-dom";
import translate from "./../../../i18n/translate";
const SubNav = ({ mobile }) => {
  const history = useHistory().location.pathname.split("/")[2];
  const historyPush = useHistory();
  return (
    <div className=" d-flex justify-content-around sub-nav my-2">
      <div className="my-2">
        <button onClick={() => historyPush.push(`/company/jawwalNo`)} className="btn rom-selected ">
          {translate("Back")}
        </button>
      </div>
      <div className="my-3">
        {" "}
        <Link
          className={`link-main ${history === "jawwalCredit" ? "active-sub" : ""}`}
          to={`/company/jawwalCredit/${mobile}`}
        >
          {translate("addCreadit")}
        </Link>
      </div>
      <div className="my-3">
        <Link
          className={`link-main ${history === "jawwalMin" ? "active-sub" : ""}`}
          to={`/company/jawwalMin/${mobile}`}
        >
          {translate("jawwalMin")}
        </Link>
      </div>
      <div className="my-3">
        {" "}
        <Link className={`link-main ${history === "jawwal3g" ? "active-sub" : ""}`} to={`/company/jawwal3g/${mobile}`}>
          {translate("g3")}
        </Link>
      </div>

      <div className="my-3">
        {" "}
        <Link
          className={`link-main ${history === "jawwalRom" ? "active-sub" : ""}`}
          to={`/company/jawwalRom/${mobile}`}
        >
          {translate("Roaming")}
        </Link>
      </div>
    </div>
  );
};

export default SubNav;
