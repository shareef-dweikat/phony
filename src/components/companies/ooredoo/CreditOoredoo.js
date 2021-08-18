import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import TextFieldGroup from "./../../common/TextFieldGroup";
import "./ooredoo.css";
import credits, { EMPTY_CREDIT } from "./credits";
import SubNavOoredoo from "./SubNavOoredoo";
import Selected from "./Selected";

const CreditOoredoo = ({ auth, loading }) => {
  const history = useHistory().location.pathname;
  const pushHistory = useHistory();
  const mobileNo = history.split("/")[4];
  const formattedMbileNo = mobileNo.slice(0, 3) + "-" + mobileNo.slice(3, 6) + "-" + mobileNo.slice(6, 10);

  const [inputForm, setInputForm] = useState({
    dis: "",
    price: null,
    url: null,
    id: "",
  });
  const [g3, setG3] = useState("");
  const [min, setMin] = useState("");
  const [credit, setCredit] = useState("");
  const [rom, setRom] = useState("");
  const [shabab, setShabab] = useState("");
  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 col-6");

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
    refreshColumnStyle();
  }, []);
  
  const onChange = (e) => {
    const selectedCredit = { ...EMPTY_CREDIT, price: e.target.value };
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
    setCredit(selectedCredit);
    localStorage.ooredooCredit = JSON.stringify(selectedCredit);
  };
  const onTypeClick = (item) => {
    localStorage.ooredooCredit = JSON.stringify(item);
    setCredit(item);
  };

  const refreshColumnStyle = () => {
    switch(localStorage.size) {
      case "default":
        setColumnStyle("col-lg-3 col-md-4 col-sm-6 col-6");
        break;
      case "column3":
        setColumnStyle("col-lg-4 col-md-6 col-sm-6 col-6 card-lg");
        break;
      case "column4":
      setColumnStyle("col-lg-3 col-md-4 col-sm-6 col-6 card-md");
      break;
      case "column6":
      setColumnStyle("col-lg-2 col-md-2 col-sm-4 col-6 card-sm");
      break;
    }
  }

  return (
    <div className="container ooredoo-container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="">
            <div className="row mt-2">
              <div className="col-3">
                <div className="card ooredoo-back"></div>
              </div>
              <div className="col-9">
                <div className=" card nav-layout">
                  <div className="form-group row px-2">
                    <div className="col-md-6 col-sm-12 col-form-label mobile-semi">
                      <i class="fas fa-phone" style={{fontSize: "1.4rem"}}></i>
                      <span style={{fontSize: "1.6rem", marginRight: 10, marginLeft: 10, marginTop: 5, display: "inline-block"}}>
                        { formattedMbileNo }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <SubNavOoredoo mobile={mobileNo} />
              </div>
            </div>
            <div className="position-relative">
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
              
              <hr className="mt-3" style={{ border: "2px solid #42ace3", backgroundColor: "#42ace3", fontWeight: "bolder" }} />

              <div className="row ">
                {credits.map((item) => (
                  <div className={`${columnStyle} my-2`}>
                    <div className="card outer-wrapper charge-card">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => onTypeClick(item)}
                      >
                        <div className="card">
                          <img
                            src={item.url}
                          ></img>
                          {item && item.des}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={`${columnStyle} my-2`}>
                  <div class="card card-credit outer-wrapper">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => onTypeClick({...EMPTY_CREDIT, price: inputForm.price})}
                    >
                      <div class="card">
                        <img src={EMPTY_CREDIT.url}></img>
                        <TextFieldGroup
                          style={{ 
                            width: "calc(50% - 35px)", height: "90%", padding: 0,
                            position: "absolute", top: "50%", left: "calc(50% + 25px)",
                            transform: "translateY(-50%)",
                            fontSize: "2rem", fontFamily: '"Montserrat", sans-serif', textAlign: "center",
                            outline: "#333d4c auto 4px", backgroundColor: "transparent", color: "#fff",
                          }}
                          className="mb-5"
                          name="price"
                          type="number"
                          value={inputForm.price}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.companies.loading,
});

export default connect(mapStateToProps)(CreditOoredoo);
