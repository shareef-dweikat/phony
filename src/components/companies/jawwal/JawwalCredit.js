import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import TextFieldGroup from "./../../common/TextFieldGroup";
import "./jawwal.css";
import credits, { EMPTY_CREDIT } from "./credits";
import SubNav from "./SubNav";
import Selected from "./Selected";

const JawwalCredit = ({auth, loading}) => {
  const history = useHistory().location.pathname;
  const [mobileNo, setMobileNo] = useState(
    history.split("/")[3].slice(0, 3) +
      "-" +
      history.split("/")[3].slice(3, 6) +
      "-" +
      history.split("/")[3].slice(6, 10)
  );
  const [price, setPrice] = useState(null);
  const [selected, setSelected] = useState({});
  const [jawwal3g, setJawwal3g] = useState("");
  const [jawwalRom, setJawwalRom] = useState("");
  const [jawwalMin, setJawwalMin] = useState("");
  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 col-6");

  useEffect(() => {
    document.title = "Credit Jawwal | Phone Play";
    // console.log(auth, jawwalCreadit);
    if (localStorage.JawwalMin) {
      setJawwalMin(JSON.parse(localStorage.JawwalMin));
    }
    if (localStorage.Jawwal3g) {
      setJawwal3g(JSON.parse(localStorage.Jawwal3g));
    }
    if (localStorage.JawwalCredit) {
      setSelected(JSON.parse(localStorage.JawwalCredit));
    }
    if (localStorage.JawwalRom) {
      setJawwalRom(JSON.parse(localStorage.JawwalRom));
    }
    refreshColumnStyle();
  }, []);
  
  const onChange = (e) => {
    const selectedCredit = { ...EMPTY_CREDIT, price: e.target.value };
    setPrice(e.target.value);
    setSelected(selectedCredit);
    localStorage.JawwalCredit = JSON.stringify(selectedCredit);
  };
  const onTypeClick = (item) => {
    localStorage.JawwalCredit = JSON.stringify(item);
    setSelected(item);
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
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="">
            <div className="row mt-2">
              <div className="col-3">
                <div className="card jawwal-back">
                  <h1 className="jawwal-text">{translate("jawwalCredit")}</h1>
                </div>
              </div>
              <div className="col-9">
                <div className=" card nav-layout">
                  <div className="form-group row px-2">
                    <div className="col-md-6 col-sm-12 col-form-label mobile-semi">
                      <i class="fas fa-phone" style={{fontSize: "1.4rem"}}></i>
                      <span style={{fontSize: "1.6rem", marginRight: 10, marginLeft: 10, marginTop: 5, display: "inline-block"}}>
                        { mobileNo }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <SubNav mobile={history.split("/")[3]} />
              </div>
            </div>
            <div className="position-relative">
              <Selected
                min={jawwalMin}
                setMin={setJawwalMin}
                g3={jawwal3g}
                setg3={setJawwal3g}
                credit={selected}
                setCredit={setSelected}
                setRom={setJawwalRom}
                rom={jawwalRom}
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
                      onClick={() => onTypeClick({...EMPTY_CREDIT, price: price})}
                    >
                      <div class="card">
                        <img src={EMPTY_CREDIT.url}></img>
                        <TextFieldGroup
                          style={{ 
                            width: "calc(50% - 20px)", height: "70%", padding: 0,
                            position: "absolute", top: "50%", left: "calc(50% + 12px)",
                            transform: "translateY(-50%)",
                            fontSize: "2rem", fontFamily: '"Montserrat", sans-serif', textAlign: "center",
                            outline: "rgb(16, 16, 16) auto 4px", 
                          }}
                          className="mb-5"
                          name="price"
                          type="number"
                          onChange={onChange}
                          min={10}
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

export default connect(mapStateToProps)(JawwalCredit);
