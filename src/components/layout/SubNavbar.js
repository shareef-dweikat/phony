import React, { useEffect, useState } from "react";
import Typing from "../../components/ui/Typing/Typing";
import { getAdvertise } from "../../actions/userAction";
import "./subnav.css";

const SubNavbar = () => {
  const [advs, setAdvs] = useState(JSON.parse(sessionStorage.getItem("advertise")) || []);
  useEffect(() => {
    const advertise = JSON.parse(sessionStorage.getItem("advertise"));
    if (!(Array.isArray(advertise) && advertise.length > 0)) {
      getAdvertise(localStorage.langCity).then((result) => {
        if (result.data) {
          const advs = Object.values(result.data).filter((val) => val !== "N/A");
          sessionStorage.setItem("advertise", JSON.stringify(advs));
          setAdvs(advs);
        }
      })
    }
  }, []);
  
  return (
    <div className="container">
      <div className="subnav">
        {advs.length > 0 && <Typing sentences={advs} loop={true} /> }
      </div>
    </div>
  );
};
export default SubNavbar;
