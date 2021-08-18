import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import SubNav from "./SubNav";
import { getJawwalRom } from "../../../actions/companiesAction";
import Spinner from "../../ui/spinner/Spinner";
import Selected from "./Selected";

const JawwalRom = ({ getJawwalRom, loading, jawwalRom }) => {
  const history = useHistory().location.pathname;

  const [typeRoming, setTypeRoming] = useState("Jordan");
  const [mobileNo, setMobileNo] = useState(
    history.split("/")[3].slice(0, 3) +
      "-" +
      history.split("/")[3].slice(3, 6) +
      "-" +
      history.split("/")[3].slice(6, 10)
  );
  const [selected, setSelected] = useState("");
  const [jawwalMin, setJawwalMin] = useState("");
  const [credit, setCredit] = useState("");
  const [jawwal3g, setJawwal3g] = useState("");
  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 col-6");

  useEffect(() => {
    getJawwalRom(mobileNo, false);
    document.title = "Rom Jawwal | Phone Play";
    if (localStorage.Jawwal3g) {
      setJawwal3g(JSON.parse(localStorage.Jawwal3g));
    }
    if (localStorage.JawwalMin) {
      setJawwalMin(JSON.parse(localStorage.JawwalMin));
    }
    if (localStorage.JawwalCredit) {
      setCredit(JSON.parse(localStorage.JawwalCredit));
    }
    if (localStorage.JawwalRom) {
      setSelected(JSON.parse(localStorage.JawwalRom));
    }
    refreshColumnStyle();
  }, []);
  
  const selectTypeClick = (type) => {
    setTypeRoming(type);
  };
  const onTypeClick = (item) => {
    localStorage.JawwalRom = JSON.stringify(item);
    setSelected(item);
  };
  const refreshClick = () => {
    getJawwalRom(mobileNo, false);
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
          <div className="card card-home">
            <div className="row mt-2">
              <div className="col-3">
                <div className="card jawwal-back">
                  <h1 className="jawwal-text">{translate("jawwalRom")}</h1>
                </div>
              </div>
              <div className="col-9">
                <div className=" card nav-layout">
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
          <div className=" position-relative">
            <Selected
              min={jawwalMin}
              setMin={setJawwalMin}
              g3={jawwal3g}
              setg3={setJawwal3g}
              credit={credit}
              setCredit={setCredit}
              rom={selected}
              setRom={setSelected}
            />
            
            <hr className="mt-3" style={{ border: "2px solid #42ace3", backgroundColor: "#42ace3", fontWeight: "bolder" }} />
            
            <div className="card">
              <div
                className="d-flex justify-content-between mx-3 type-rom"
                style={{ fontFamily: "initial", fontSize: "2rem" }}
              >
                <button
                  className={`btn btn-light main-text mx-1 ${typeRoming === "Jordan" ? "rom-selected" : null}`}
                  onClick={() => selectTypeClick("Jordan")}
                >
                  {translate("Jordan")}
                </button>
                <button
                  className={`btn btn-light main-text mx-1 ${typeRoming === "Saudi Arabia" ? "rom-selected" : null}`}
                  onClick={() => selectTypeClick("Saudi Arabia")}
                >
                  {translate("Saudi")}
                </button>
                <button
                  className={`btn btn-light main-text mx-1 ${
                    typeRoming === "Locally - Cellcom - Partner" ? "rom-selected" : null
                  }`}
                  onClick={() => selectTypeClick("Locally - Cellcom - Partner")}
                >
                  {translate("Locall")}
                </button>
                <button
                  className={`btn btn-light main-text mx-1 ${typeRoming === "China" ? "rom-selected" : null}`}
                  onClick={() => selectTypeClick("China")}
                >
                  {translate("China")}
                </button>
                <button
                  className={`btn btn-light main-text mx-1 ${
                    typeRoming === "Turkey - UAE - USA" ? "rom-selected" : null
                  }`}
                  onClick={() => selectTypeClick("Turkey - UAE - USA")}
                >
                  {translate("Turkey")}
                </button>
                <button
                  className={`btn btn-light main-text mx-1 ${typeRoming === "Others" ? "rom-selected" : null}`}
                  onClick={() => selectTypeClick("Others")}
                >
                  {translate("Others")}{" "}
                </button>
                {/* </label> */}
              </div>
            </div>
            <div className="card list-cards">
              <div className="row mb-5">
                {loading && (
                  <Spinner/>
                )}
                {jawwalRom.filter(({ country }) => country === typeRoming).length === 0 && !loading ? (
                  <div className="d-flex justify-content-center mt-3">
                    <h1 className="warning-text">No available bundles</h1>
                  </div>
                ) : (
                  jawwalRom
                    .filter(({ country }) => country === typeRoming)
                    .map((item, index) => (
                      <div className={`${columnStyle} mt-4`}>
                        <div className="card charge-card">
                          <a
                            style={{ cursor: "pointer" }}
                            data-placement="top"
                            title={item && item.des}
                            onClick={() => onTypeClick(item)}
                          >
                            <div className="frame-card">
                              <img
                                alt={item.des}
                                src={item.url}
                                // width="100px"
                                // height="50px"
                              ></img>
                            </div>
                          </a>
                        </div>
                        <div className="card filtter-rom filtter-active">
                          <div class="text-center" id="headingOne">
                            <h5 class="mb-0">
                              <a
                                class="link-main details"
                                style={{ fontWeight: "bolder" }}
                                data-toggle="collapse"
                                data-target={"#" + index}
                                aria-expanded="true"
                                aria-controls={index}
                              >
                                <small>{translate("Details")}</small>{" "}
                              </a>
                            </h5>
                          </div>
                          <div
                            id={index}
                            class="collapse hidden"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
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
  jawwalRom: state.companies.jawwalRom,
  loading: state.companies.loading,
});
export default connect(mapStateToProps, { getJawwalRom })(JawwalRom);
