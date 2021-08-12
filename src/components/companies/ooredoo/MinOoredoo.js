import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import Selected from "./Selected";
import SubNavOoredoo from "./SubNavOoredoo";
import { getOoredooMin, getOoredooMinRenew, getOoredooMinNotRenew } from "../../../actions/companiesAction";
import Spinner from "../../ui/spinner/Spinner";

const MinOoredoo = ({ getOoredooMin, ooredooMin, loading, getOoredooMinRenew, getOoredooMinNotRenew }) => {
  const history = useHistory();
  const mobileNo = history.location.pathname.split("/")[4];
  const [isRenew, setIsRenew] = useState(false);
  const [isNotRenew, setIsNotRenew] = useState(false);
  const [g3, setG3] = useState("");
  const [min, setMin] = useState("");
  const [credit, setCredit] = useState("");
  const [rom, setRom] = useState("");
  const [shabab, setShabab] = useState("");
  useEffect(() => {
    document.title = "Ooredoo  Minutes | Phone Play";
    getOoredooMin();
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
    setMin(item);
    localStorage.ooredooMin = JSON.stringify(item);
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>{" "}
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
            <div className="card ooredoo-back">
              <div className="row">
                <div className=" col-5 m-3 mt-4">
                  <h1 className="jawwal-text m-4">{translate("minutes")}</h1>
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
                <label className="mt-3   col-md-5 col-sm-12 col-form-label mobile-semi">
                  {translate("ooredooMinOffer")}
                </label>
                <label
                  className=" mt-1 col-md-3 col-sm-12 col-form-label mobile-semi"
                  style={{ fontFamily: "initial", fontSize: "1.8rem" }}
                >
                  {mobileNo.slice(0, 3) + "-" + mobileNo.slice(3, 6) + "-" + mobileNo.slice(6, 10)}
                </label>
                <label
                  className="  col-md-4 col-sm-12 col-form-label mobile-semi"
                  style={{ fontFamily: "initial", fontSize: "2rem" }}
                >
                  <button
                    className={`btn btn-light main-text mx-1 ${isRenew ? "selected-btn" : ""}`}
                    onClick={() => {
                      setIsNotRenew(false);
                      setIsRenew(true);
                      getOoredooMinRenew();
                    }}
                  >
                    {translate("Renewable")}
                  </button>
                  <button
                    className={`btn btn-light main-text mx-1 ${isNotRenew ? "selected-btn" : ""}`}
                    onClick={() => {
                      setIsNotRenew(true);
                      setIsRenew(false);
                      getOoredooMinNotRenew();
                    }}
                  >
                    {translate("notRenew")}
                  </button>
                </label>
              </div>
            </div>
            <SubNavOoredoo mobile={mobileNo} />
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
            <div className="row">
              {loading === true ? (
                <Spinner/>
              ) : (
                ooredooMin.map((item) => (
                  <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                    <div className="card outer-wrapper charge-card">
                      <a
                        style={{ cursor: "pointer" }}
                        data-placement="top"
                        title={item && item.des}
                        onClick={() => onTypeClick(item)}
                      >
                        <div className="frame-card">
                          <img
                            alt="sssssssssss"
                            src={item.url}
                            // width="100px"
                            // height="50px"
                          ></img>

                          {/* {item && item.des} */}
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
                            data-target={"#" + item.bundleid}
                            aria-expanded="true"
                            aria-controls={item.bundleid}
                          >
                            <small>{translate("Details")}</small>
                          </a>
                        </h5>
                      </div>

                      <div
                        id={item.bundleid}
                        class="collapse hidden"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div class="card-body">{item.bundle_description}</div>
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
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  ooredooMin: state.companies.ooredooMin,
  loading: state.companies.loading,
});

export default connect(mapStateToProps, { getOoredooMin, getOoredooMinRenew, getOoredooMinNotRenew })(MinOoredoo);
