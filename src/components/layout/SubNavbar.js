import React, { useEffect } from "react";
import "./subnav.css";
import Typing from "../../components/ui/Typing/Typing";
import { useIntl } from "react-intl";

const SubNavbar = () => {
  const intl = useIntl();
  useEffect(() => {
  }, []);
  
  return (
    <div className="container">
      <div className="subnav">
        <Typing>
          <span>{intl.formatMessage({ id: "ads1" })}</span>
        </Typing>
      </div>
    </div>
  );
};
export default SubNavbar;
