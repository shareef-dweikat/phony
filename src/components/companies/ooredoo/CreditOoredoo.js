import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import TextFieldGroup from "./../../common/TextFieldGroup";
import SubNavOoredoo from "./SubNavOoredoo";
import creditCard from "./creditcard";
import Selected from "./Selected";
const CreditOoredoo = () => {
  const history = useHistory();
  const mobileNo = history.location.pathname.split("/")[4];
  const [g3, setG3] = useState("");
  const [min, setMin] = useState("");
  const [credit, setCredit] = useState("");
  const [rom, setRom] = useState("");
  const [shabab, setShabab] = useState("");
  useEffect(() => {
    document.title = "Ooredoo Credit | Phone Play";
    if (localStorage.ooredoo3g) {
      setG3(JSON.parse(localStorage.ooredoo3g));
    }
    if (localStorage.ooredooMin) {
      setMin(JSON.parse(localStorage.ooredooMin));
    }
    if (localStorage.ooredooCredit) {
      setCredit(JSON.parse(localStorage.ooredooCredit));
    }
    if (localStorage.ooredooCredit) {
      setCredit(JSON.parse(localStorage.ooredooCredit));
    }
    if (localStorage.ooredooRom) {
      setRom(JSON.parse(localStorage.ooredooRom));
    }
    if (localStorage.ooredooSuper) {
      setShabab(JSON.parse(localStorage.ooredooSuper));
    }
  }, []);

  const onTypeClick = (item) => {
    localStorage.ooredooCredit = JSON.stringify(item);
    setCredit(item);
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
            <div className="card ooredoo-back">
              <div className="row">
                <div className=" col-5 m-3">
                  <h1 className="jawwal-text m-4 mt-4">{translate("etopup")}</h1>
                </div>
                <div className=" col-2"></div>
                <div className=" col-4 d-flex align-items-center">
                  <img src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1623501933/WhatsApp_Image_2021-06-12_at_3.24.01_PM_lgadod.jpg" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className=" card nav-layout">
              <div className="form-group row m-2">
                <label className="mt-3   col-md-5 col-sm-12 col-form-label mobile-semi">Ooredoo E-TOPUP</label>
                <label
                  className=" mt-1 col-md-3 col-sm-12 col-form-label mobile-semi"
                  style={{ fontFamily: "initial", fontSize: "1.8rem" }}
                >
                  {mobileNo.slice(0, 3) + "-" + mobileNo.slice(3, 6) + "-" + mobileNo.slice(6, 10)}
                </label>
              </div>
            </div>
            <SubNavOoredoo mobile={mobileNo} />
          </div>
          <Selected
            min={min}
            setMin={setMin}
            g3={g3}
            setg3={setG3}
            credit={credit}
            setCredit={setCredit}
            shabab={shabab}
            setShabab={setShabab}
            setRom={setRom}
            rom={rom}
          />
            <hr className="mt-3" style={{ border: "2px solid #000", fontWeight: "bolder" }} />
          <div className="row ">
            {creditCard.map((item) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-6 mt-1 ">
                <div className="card outer-wrapper charge-card">
                  <a
                    style={{ cursor: "pointer" }}
                    data-placement="top"
                    title={item && item.des}
                    onClick={() => onTypeClick(item)}
                  >
                    <div className="frame-card">
                      <img
                        src={item.url}
                        // width="100px"
                        // height="50px"
                      ></img>
                      {item && item.des}
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditOoredoo;
