import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import {
  getJawwalMin,
  addChargeJawwal,
  chargeJawwal,
  getChargeJawwal,
  getRnewJawwalMin,
  getNotRnewJawwalMin,
} from "../../../actions/companiesAction";
import SubNav from "./SubNav";
import Spinner from "../../ui/spinner/Spinner";

const JawwalMin = ({
  auth,
  jawwalMin,
  getJawwalMin,
  addChargeJawwal,
  loading,
  getRnewJawwalMin,
  chargeJawwal,
  getNotRnewJawwalMin,
  getChargeJawwal,
}) => {
  const history = useHistory().location.pathname;
  const pushHistory = useHistory();
  const [isRenew, setIsRenew] = useState(false);
  const [isNotRenew, setIsNotRenew] = useState(false);
  const [mobileNo, setMobileNo] = useState(
    history.split("/")[3].slice(3, 6) +
      "-" +
      history.split("/")[3].slice(6, 9) +
      "-" +
      history.split("/")[3].slice(9, 13)
  );
  var [amount, setAmount] = useState("");
  const [selected, setSelected] = useState("");
  const [jawwal3g, setJawwal3g] = useState("");
  const [jawwalRom, setJawwalRom] = useState("");
  const [credit, setCredit] = useState("");
  const [loadingSpinner, isLoading] = useState(false);

  useEffect(() => {
    document.title = "Home /Min Jawwal";
    getJawwalMin(mobileNo, false);
    // getChargeJawwal();
    if (localStorage.jawwalMin) {
      setSelected(JSON.parse(localStorage.jawwalMin));
      setAmount((prev) => prev + parseFloat(selected.price));
      // amount+=parseFloat(selected.price)
    }
    if (localStorage.jawwal3g) {
      setJawwal3g(JSON.parse(localStorage.jawwal3g));
    }
    if (localStorage.JawwalCredit) {
      setCredit(JSON.parse(localStorage.JawwalCredit));
    }
    if (localStorage.JawwalRom) {
      setJawwalRom(JSON.parse(localStorage.JawwalRom));
    }
  }, []);
  useEffect(() => {
    getJawwalPackages();
  }, [isRenew, isNotRenew]);
  const onClickType3Min = (e) => {
    e.preventDefault();
    isLoading(true);

    chargeJawwal(
      {
        jawwal3g: jawwal3g || null,
        jawwalRom: jawwalRom || null,
        jawwalCredit: credit || null,
        jawwalMin: selected || null,
      },
      history,
      pushHistory
    )
    .finally(() => {
      isLoading(false);
    });
  };
  const onTypeClick = (item) => {
    localStorage.jawwalMin = JSON.stringify(item);
    setSelected(item);
    // addChargeJawwal(item);
  };
  const onCreditRemove = () => {
    localStorage.removeItem("JawwalCredit");
    setCredit("");
  };
  const onJawwal3gRemove = () => {
    localStorage.removeItem("jawwal3g");
    setJawwal3g("");
  };
  const onJawwalMinRemove = () => {
    localStorage.removeItem("jawwalMin");
    setSelected("");
  };
  const onJawwalRomRemove = () => {
    localStorage.removeItem("JawwalRom");
    setJawwalRom("");
  };

  const onRenewClick = () => {
    setIsRenew(!isRenew);
    setIsNotRenew(false);
  };
  const onNotRenewClick = () => {
    setIsNotRenew(!isNotRenew);
    setIsRenew(false);
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
                  <h1 className="jawwal-text">{translate("jawwalMin")}</h1>
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
                      className="col-md-6 col-sm-12 col-form-label mobile-semi d-flex align-items-center justify-content-start"
                      style={{ fontFamily: "initial", fontSize: "2rem" }}
                    >
                      <button className={`btn btn-light btn-md main-text mx-2`} onClick={refreshClick}>
                        {translate("refresh")}
                      </button>
                      <div class="btn-group" role="group" aria-label="Renewable">
                        <button
                          type="button"
                          className={`btn btn-light btn-md main-text border-info border-left ${isRenew ? "selected-btn" : null}`}
                          onClick={onRenewClick}
                        >
                          {translate("Renewable")}
                        </button>
                        <button
                          type="button"
                          className={`btn btn-light btn-md main-text border-info border-left ${isNotRenew ? "selected-btn" : null}`}
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
            <div className="row">
              <div className="col-10">
                <div className="card m-4s fixed-top1 position-sticky mt-2">
                  <div className="row mt-1 fixed-topx">
                    {selected !== "" && (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-4">
                        <div className="card outer-wrapper px-3">
                          <div className="frame1">
                            <img alt={selected.id} src={selected.url} width="260px" height="100px"></img>
                            <a className="close-btn" onClick={onJawwalMinRemove}>
                              <i class="fa fa-times" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {credit !== "" && (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-4">
                        <div className="card outer-wrapper px-3">
                          <div className="frame1">
                            <img
                              alt="sssssssssss"
                              src={
                                credit.url ||
                                "https://res.cloudinary.com/dtu4lltbk/image/upload/v1622203339/eced7efa-a16b-4fdd-9528-2c1f10356e1c_lzfhei.jpg"
                              }
                              width="260px"
                              height="100px"
                            ></img>
                            {!credit.url && <label className="text-abs">{credit.price}</label>}
                            <a className="close-btn" onClick={onCreditRemove}>
                              <i class="fa fa-times" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {jawwalRom !== "" && (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-4">
                        <div className="card outer-wrapper px-3">
                          <div className="frame1">
                            <img alt="sssssssssss" src={jawwalRom.url} width="260px" height="100px"></img>
                            <a className="close-btn" onClick={onJawwalRomRemove}>
                              <i class="fa fa-times" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {jawwal3g !== "" && (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-4">
                        <div className="card outer-wrapper px-3">
                          <div className="frame1">
                            <img alt="sssssssssss" src={jawwal3g.url} width="260px" height="100px"></img>
                            <a className="close-btn">
                              <i class="fa fa-times" aria-hidden="true" onClick={onJawwal3gRemove}></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div class="card total-balance-card mt-2">
                  <div class="card-body py-2">
                    <h5 class="text-muted mt-1 mb-2" title="Balance" style={{fontSize: "1.2rem" }}>{translate("total")}</h5>
                    <h3 class="text-info mt-2">₪ {(selected.price ? parseFloat(selected.price) : 0) +
                      (jawwalRom.price ? parseFloat(jawwalRom.price) : 0) +
                      (jawwal3g.price ? parseFloat(jawwal3g.price) : 0) +
                      (credit.price ? parseFloat(credit.price) : 0)}
                    </h3>
                    <button
                      type="submit"
                      class={`btn btn-success ${
                        (selected.price ? parseFloat(selected.price) : 0) +
                          (jawwalRom.price ? parseFloat(jawwalRom.price) : 0) +
                          (jawwal3g.price ? parseFloat(jawwal3g.price) : 0) +
                          (credit.price ? parseFloat(credit.price) : 0) ===
                          0 && "disabled"
                      }`}
                      style={{margin: "auto", display: "block"}}
                      disabled={loadingSpinner}
                      onClick={onClickType3Min}
                    >
                      {translate("accept")}
                    </button>
                    {loadingSpinner && <Spinner />}
                  </div>
                </div>
              </div>
            </div>

            <hr className="mt-3" style={{ border: "2px solid #42ace3", backgroundColor: "#42ace3", fontWeight: "bolder" }} />

            <div className="row">
              {loading && (
                <Spinner/>
              )}
              {jawwalMin && jawwalMin.length === 0 && !loading ? (
                <div className="d-flex justify-content-center mt-3">
                  <h1 className="warning-text">No available bundles</h1>
                </div>
              ) : (
                jawwalMin.map((item, index) => (
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
                            data-target={"#" + index}
                            aria-expanded="true"
                            aria-controls={index}
                          >
                            <small>{translate("Details")}</small>
                          </a>
                        </h5>
                      </div>

                      <div id={index} class="collapse hidden" aria-labelledby="headingOne" data-parent="#accordion">
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
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  jawwalMin: state.companies.jawwalMin,
  chargeJawwal: state.companies.chargeJawwal,
  loading: state.companies.loading,
});

export default connect(mapStateToProps, {
  getJawwalMin,
  addChargeJawwal,
  getChargeJawwal,
  getRnewJawwalMin,
  getNotRnewJawwalMin,
  chargeJawwal,
})(JawwalMin);
