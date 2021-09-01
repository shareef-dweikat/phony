import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import {
  getJawwalMin,
  getChargeJawwal,
  getRnewJawwalMin,
  getNotRnewJawwalMin,
} from "../../../actions/companiesAction";
import SubNav from "./SubNav";
import Spinner from "../../ui/spinner/Spinner";
import Badge from "../../ui/Badge/Badge";
import _ from "lodash";
import Selected from "./Selected";

const JawwalMin = ({
  auth,
  jawwalMin,
  getJawwalMin,
  loading,
  getRnewJawwalMin,
  getNotRnewJawwalMin,
}) => {
  const history = useHistory().location.pathname;
  const pushHistory = useHistory();
  const [isRenew, setIsRenew] = useState(false);
  const [isNotRenew, setIsNotRenew] = useState(false);
  const [init, isInit] = useState(false);
  const [mobileNo, setMobileNo] = useState(
    history.split("/")[3].slice(0, 3) +
      "-" +
      history.split("/")[3].slice(3, 6) +
      "-" +
      history.split("/")[3].slice(6, 10)
  );
  var [amount, setAmount] = useState("");
  const [selected, setSelected] = useState("");
  const [jawwal3g, setJawwal3g] = useState("");
  const [jawwalRom, setJawwalRom] = useState("");
  const [credit, setCredit] = useState("");
  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-4");

  useEffect(() => {
    document.title = "Jawwal Min | Phone Play";
    getJawwalMin(mobileNo, false);
    if (localStorage.JawwalMin) {
      setSelected(JSON.parse(localStorage.JawwalMin));
      setAmount((prev) => prev + parseFloat(selected.price));
    }
    if (localStorage.Jawwal3g) {
      setJawwal3g(JSON.parse(localStorage.Jawwal3g));
    }
    if (localStorage.JawwalCredit) {
      setCredit(JSON.parse(localStorage.JawwalCredit));
    }
    if (localStorage.JawwalRom) {
      setJawwalRom(JSON.parse(localStorage.JawwalRom));
    }
    refreshColumnStyle();
  }, []);

  useEffect(() => {
    if (init) {
      getJawwalPackages();
    }
    isInit(true);
  }, [isRenew, isNotRenew]);

  const onTypeClick = (item) => {
    localStorage.JawwalMin = JSON.stringify(item);
    topDiv.scrollIntoView({ behavior: "smooth" });
    setSelected(item);
  };
  const onRenewClick = () => {
    setIsRenew(!isRenew);
    setIsNotRenew(false);
    isInit(true);
  };
  const onNotRenewClick = () => {
    setIsNotRenew(!isNotRenew);
    setIsRenew(false);
    isInit(true);
  };
  const getJawwalPackages = () => {
    if (!isRenew && !isNotRenew) {
      getJawwalMin(mobileNo, false);
    } else if (isRenew) {
      getRnewJawwalMin();
    } else if (isNotRenew) {
      getNotRnewJawwalMin();
    }
  }
  const refreshClick = () => {
    getJawwalMin(mobileNo, true);
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
      setColumnStyle("col-lg-3 col-md-4 col-sm-6 col-6  card-md");
      break;
      case "column6":
      setColumnStyle("col-lg-2 col-md-2 col-sm-4 col-6 card-sm");
      break;
    }
  }
  let topDiv = null;

  return (
    <div className="container" ref={(ref)=> topDiv = ref}>
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
            <div className="row mt-2">
              <div className="col-3">
                <div className="card jawwal-back">
                  <h1 className="jawwal-text">{translate("jawwal")}</h1>
                </div>
              </div>
              <div className="col-9">
                <div className="card nav-layout">
                  <div className="form-group row px-2">
                    <div className="col-md-6 col-sm-12 col-form-label mobile-semi">
                      <i class="fas fa-phone" style={{fontSize: "1.4rem"}}></i>
                      <span style={{fontSize: "1.6rem", marginRight: 10, marginLeft: 10, marginTop: 5, display: "inline-block"}}>{mobileNo}</span>
                    </div>
                    <label
                      className="col-md-6 col-sm-12 col-form-label mobile-semi d-flex align-items-center justify-content-end"
                      style={{ fontFamily: "initial", fontSize: "2rem" }}
                    >
                      <button className={`btn btn-light btn-md main-text mx-1`} onClick={refreshClick}>
                        {translate("refresh")}
                      </button>
                      <div class="btn-group" role="group" aria-label="Renewable">
                        <button
                          type="button"
                          className={`btn btn-light btn-md btn-renewable main-text border-info border-left px-1 ${isRenew ? "selected-btn" : ""}`}
                          onClick={onRenewClick}
                        >
                          {translate("Renewable")}
                        </button>
                        <button
                          type="button"
                          className={`btn btn-light btn-md btn-renewable main-text border-info border-left px-1 ${isNotRenew ? "selected-btn" : ""}`}
                          onClick={onNotRenewClick}
                        >
                          {translate("notRenew")}
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <SubNav mobile={history.split("/")[3]} />
              </div>
            </div>
          </div>
          <div className="position-relative">
            <Selected
              min={selected}
              setMin={setSelected}
              g3={jawwal3g}
              setg3={setJawwal3g}
              credit={credit}
              setCredit={setCredit}
              rom={jawwalRom}
              setRom={setJawwalRom}
            />

            <hr className="mt-3" style={{ border: "2px solid #42ace3", backgroundColor: "#42ace3", fontWeight: "bolder" }} />

            <div className="card list-cards">
              <div className="row">
                {loading && (
                  <Spinner/>
                )}
                {!_.isArray(jawwalMin) && !loading ? (
                  <div className="d-flex justify-content-center mt-3">
                    <h2 className="text-info">{translate("No available bundles")}</h2>
                  </div>
                ) : (
                  jawwalMin.map((item, index) => (
                    <div className={`${columnStyle} mt-3`}>
                      <div className="card charge-card">
                        <a
                          style={{ cursor: "pointer" }}
                          data-placement="top"
                          title={item && item.des}
                          onClick={() => onTypeClick(item)}
                        >
                          <div className="position-relative">
                            <img
                              alt={item.id}
                              src={item.url}
                            ></img>
                            {(item.renew === "True" || item.renew === "true") && (
                              <Badge text={translate("Renewable")}></Badge>
                            )}
                          </div>
                        </a>
                      </div>
                      <div className="card">
                        <div class="text-center" id="headingOne">
                          <h5 class="mb-0 mx-">
                            <a
                              class="link-main details"
                              style={{ fontWeight: "bolder" }}
                              data-toggle="collapse"
                              data-target={"#" + index}
                              aria-expanded="true"
                              aria-controls={index}
                            >
                              <small>{translate("Details")}</small>
                            </a>
                          </h5>
                        </div>

                        <div id={index} class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                          <div class="card-body">
                            {item.des}
                            <br/>
                            [{translate("ID")}:{item.id || item.ID}]
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
  jawwalMin: state.companies.jawwalMin,
  loading: state.companies.loading,
});

export default connect(mapStateToProps, {
  getJawwalMin,
  getChargeJawwal,
  getRnewJawwalMin,
  getNotRnewJawwalMin,
})(JawwalMin);
