import { useEffect, useState } from "react";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import SubNavOoredoo from "./SubNavOoredoo";
import { connect } from "react-redux";
import { getOoredooSuper, getOoredooSuperNotRenew, getOoredooSuperRenew } from "../../../actions/companiesAction";
import Selected from "./Selected";
import Spinner from "../../ui/spinner/Spinner";

const ShababOoredoo = ({ getOoredooSuper, ooredooSuper, getOoredooSuperNotRenew, loading, getOoredooSuperRenew }) => {
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
    document.title = "Ooredoo Shabab";
    getOoredooSuper();
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
    setShabab(item);
    localStorage.ooredooSuper = JSON.stringify(item);
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
                <div className=" col-6 m-3">
                  <h1 className="jawwal-text m-4">{translate("superShabab")}</h1>
                </div>
                <div className=" col-2"></div>
                <div className=" col-3 d-flex align-items-center">
                  <img src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1623501933/WhatsApp_Image_2021-06-12_at_3.24.01_PM_lgadod.jpg" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className=" card nav-layout">
              <div className="form-group row m-2">
                <label className="mt-3   col-md-5 col-sm-12 col-form-label mobile-semi">
                  {translate("ooredooSuperOffer")}
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
                    className={`btn btn-light main-text mx-1 ${isRenew ? "selected-btn" : null}`}
                    onClick={() => {
                      setIsNotRenew(false);
                      setIsRenew(true);
                      getOoredooSuperRenew();
                    }}
                  >
                    {translate("Renewable")}
                  </button>
                  <button
                    className={`btn btn-light main-text mx-1 ${isNotRenew ? "selected-btn" : null}`}
                    onClick={() => {
                      setIsNotRenew(true);
                      setIsRenew(false);
                      getOoredooSuperNotRenew();
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
              {loading && (
                <Spinner/>
              )}
              {ooredooSuper && ooredooSuper.length === 0 && !loading ? (
                <div className="d-flex justify-content-center mt-3">
                  <h1 className="warning-text">{translate("NoAvailable")}</h1>
                </div>
              ) : (
                ooredooSuper.map((item) => (
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
  ooredooSuper: state.companies.ooredooSuper,
  loading: state.companies.loading,
});

export default connect(mapStateToProps, { getOoredooSuper, getOoredooSuperRenew, getOoredooSuperNotRenew })(
  ShababOoredoo
);
