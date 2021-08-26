import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import Selected from "./Selected";
import SideBar from "../../homePage/SideBar";
import SubNavOoredoo from "./SubNavOoredoo";
import { getOoredooRom, getOoredooRomRenew, getOoredooRomNotRenew } from "../../../actions/companiesAction";
import Spinner from "../../ui/spinner/Spinner";
import Badge from "../../ui/Badge/Badge";
import _ from "lodash";
import "./ooredoo.css";

const RomOoredoo = ({ getOoredooRom, ooredooRom, loading, getOoredooRomRenew, getOoredooRomNotRenew }) => {
  const history = useHistory().location.pathname;
  const mobileNo = history.split("/")[4];
  const formattedMbileNo = mobileNo.slice(0, 3) + "-" + mobileNo.slice(3, 6) + "-" + mobileNo.slice(6, 10);

  const [isRenew, setIsRenew] = useState(false);
  const [isNotRenew, setIsNotRenew] = useState(false);
  const [init, isInit] = useState(false);

  const [g3, setG3] = useState("");
  const [min, setMin] = useState("");
  const [credit, setCredit] = useState("");
  const [rom, setRom] = useState("");
  const [shabab, setShabab] = useState("");
  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 col-6");

  useEffect(() => {
    document.title = "Ooredoo  Rom | Phone Play";
    getOoredooRom(false);

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

  useEffect(() => {
    if (init) {
      getOoredooPackages();
    }
    isInit(true);
  }, [isRenew, isNotRenew]);

  const onTypeClick = (item) => {
    setRom(item);
    localStorage.ooredooRom = JSON.stringify(item);
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
  const getOoredooPackages = () => {
    if (!isRenew && !isNotRenew) {
      getOoredooRom(false);
    } else if (isRenew) {
      getOoredooRomRenew();
    } else if (isNotRenew) {
      getOoredooRomNotRenew();
    }
  }
  const refreshClick = () => {
    getOoredooRom(true);
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
  return (
    <div className="container ooredoo-container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
            <div className="row mt-2">
              <div className="col-3">
                <div className="card ooredoo-back"></div>
              </div>
              <div className="col-9">
                <div className="card nav-layout">
                  <div className="form-group row px-2">
                    <div className="col-md-6 col-sm-12 col-form-label mobile-semi">
                      <i class="fas fa-phone" style={{fontSize: "1.4rem"}}></i>
                      <span style={{fontSize: "1.6rem", marginRight: 10, marginLeft: 10, marginTop: 5, display: "inline-block"}}>
                        {formattedMbileNo}
                      </span>
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
                <SubNavOoredoo mobile={mobileNo} />
              </div>
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

            <div className="card list-cards">
              <div className="row">
                {loading && (
                  <Spinner/>
                )}
                {!_.isArray(ooredooRom) && !loading ? (
                  <div className="d-flex justify-content-center mt-3">
                    <h2 className="text-info">{translate("No available bundles")}</h2>
                  </div>
                ) : (
                  ooredooRom.map((item, index) => (
                    <div className={`${columnStyle} mt-3`}>
                      <div className="card charge-card">
                        <a
                          style={{ cursor: "pointer" }}
                          data-placement="top"
                          title={item && item.des}
                          onClick={() => onTypeClick(item)}
                        >
                          <div className="frame-card position-relative">
                            <img
                              alt={item.id || item.ID}
                              src={item.url}
                            ></img>
                            {(item.auto_renew === "True" || item.auto_renew === "true") && (
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
                            {item.bundle_description}
                            <br/>
                            [{translate("ID")}:{item.bundleid}]
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
  ooredooRom: state.companies.ooredooRom,
  loading: state.companies.loading,
});
export default connect(mapStateToProps, { getOoredooRom, getOoredooRomRenew, getOoredooRomNotRenew })(RomOoredoo);
