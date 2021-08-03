import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import SubNav from "./SubNav";
import { getJawwal3g, getNotRnewJawwal3g, chargeJawwal, getRnewJawwal3g } from "../../../actions/companiesAction";
import Spinner from "../../ui/spinner/Spinner";

const Jawwal3g = ({ getJawwal3g, auth, jawwal3g, loading, getRnewJawwal3g, chargeJawwal, getNotRnewJawwal3g }) => {
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
  const [selected, setSelected] = useState("");
  const [jawwalMin, setJawwalMin] = useState("");
  const [jawwalRom, setJawwalRom] = useState("");
  const [credit, setCredit] = useState("");

  useEffect(() => {
    getJawwal3g(mobileNo, false);
    document.title = "Home /3G Jawwal";
    if (localStorage.jawwal3g) {
      setSelected(JSON.parse(localStorage.jawwal3g));
    }
    if (localStorage.jawwalMin) {
      setJawwalMin(JSON.parse(localStorage.jawwalMin));
    }
    if (localStorage.JawwalCredit) {
      setCredit(JSON.parse(localStorage.JawwalCredit));
    }
    if (localStorage.JawwalRom) {
      setJawwalRom(JSON.parse(localStorage.JawwalRom));
    }
  }, []);
  const onClickType3g = (e) => {
    e.preventDefault();
    chargeJawwal(
      {
        jawwal3g: selected || null,
        jawwalRom: jawwalRom || null,
        jawwalCredit: credit || null,
        jawwalMin: jawwalMin || null,
      },
      history,
      pushHistory
    );
  };
  const onTypeClick = (item) => {
    localStorage.jawwal3g = JSON.stringify(item);
    setSelected(item);
  };
  const onCreditRemove = () => {
    localStorage.removeItem("JawwalCredit");
    setCredit("");
  };
  const onJawwal3gRemove = () => {
    localStorage.removeItem("jawwal3g");
    setSelected("");
  };
  const onJawwalMinRemove = () => {
    localStorage.removeItem("jawwalMin");
    setJawwalMin("");
  };
  const onJawwalRomRemove = () => {
    localStorage.removeItem("JawwalRom");
    setJawwalRom("");
  };

  const onRenewClick = () => {
    getRnewJawwal3g();
    setIsRenew(true);
    setIsNotRenew(false);
  };
  const onNotRenewClick = () => {
    getNotRnewJawwal3g();
    setIsNotRenew(true);
    setIsRenew(false);
  };
  const refreshClick = () => {
    getJawwal3g(mobileNo, true);
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
              <div className="col-3" style={{paddingLeft:0}}>
                <div className="card jawwal-back">
                  <h1 className="jawwal-text m-4">{translate("jawwal3g")}</h1>
                </div>
              </div>
              <div className="col-9">
                <div className="card nav-layout">
                  <div className="form-group row px-2">
                    <label className="col-md-6 col-sm-12 col-form-label mobile-semi" style={{fontSize: "1.4rem"}}>
                      {translate("jawwalOffer3g")} <br/><strong style={{fontSize: "1.6rem"}}>{mobileNo}</strong>
                    </label>
                    <label
                      className="col-md-6 col-sm-12 col-form-label mobile-semi d-flex align-items-center justify-content-cnter"
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
          <div className=" card position-relative">
            <div className="card m-4s fixed-top1 position-sticky mt-2">
              <div className=" row mt-1 fixed-topx">
                {selected !== "" && (
                  <div className="col-lg-3 col-md-4 col-sm-4 mt-2">
                    <div className="card outer-wrapper px-3 ">
                      <div className="frame1">
                        <img alt="sssssssssss" src={selected.url} width="260px" height="100px"></img>
                        <a className="close-btn">
                          <i class="fa fa-times" aria-hidden="true" onClick={onJawwal3gRemove}></i>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {jawwalRom !== "" && (
                  <div className="col-lg-3 col-md-4 col-sm-4 mt-2">
                    <div className="card outer-wrapper  px-3">
                      <div className="frame1">
                        <img alt="sssssssssss" src={jawwalRom.url} width="260px" height="100px"></img>
                        <a className="close-btn" onClick={onJawwalRomRemove}>
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {credit !== "" && (
                  <div className="col-lg-3 col-md-4 col-sm-4 mt-2">
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
                {jawwalMin !== "" && (
                  <div className="col-lg-3 col-md-4 col-sm-4 mt-2">
                    <div className="card outer-wrapper px-3 ">
                      <div className="frame1">
                        <img alt="sssssssssss" src={jawwalMin.url} width="260px" height="100px"></img>
                        <a className="close-btn" onClick={onJawwalMinRemove}>
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <form class="form-inline mt-5">
              <div class="form-group row d-flex justify-content-center">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">
                  {translate("total")}
                </label>
                <div class="col-sm-4 text-center text-bold">
                  <label class=" form-control-lg">
                    {(selected.price ? parseFloat(selected.price) : 0) +
                      (jawwalRom.price ? parseFloat(jawwalRom.price) : 0) +
                      (credit.price ? parseFloat(credit.price) : 0) +
                      (jawwalMin.price ? parseFloat(jawwalMin.price) : 0)}
                  </label>
                </div>

                <button
                  type="submit"
                  class={`col-sm-2 btn btn sign-but ${
                    (selected.price ? parseFloat(selected.price) : 0) +
                      (jawwalRom.price ? parseFloat(jawwalRom.price) : 0) +
                      (credit.price ? parseFloat(credit.price) : 0) +
                      (jawwalMin.price ? parseFloat(jawwalMin.price) : 0) ===
                      0 && "disabled"
                  }`}
                  onClick={onClickType3g}
                >
                  {translate("accept")}
                </button>
              </div>
            </form>
            <hr className="mt-3" style={{ border: "2px solid #000", fontWeight: "bolder" }} />
            <div className="card">
              <div className="row">
                {loading && (
                  <Spinner/>
                )}
                {jawwal3g && jawwal3g.length === 0 && !loading ? (
                  <div className="d-flex justify-content-center mt-3">
                    <h1 className="warning-text">{translate('NoAvailable')}</h1>
                  </div>
                ) : (
                  jawwal3g.map((item, index) => (
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
                          </div>
                        </a>
                      </div>
                      <div className="card">
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  jawwal3g: state.companies.jawwal3g,
  loading: state.companies.loading,
});
export default connect(mapStateToProps, {
  getJawwal3g,
  getRnewJawwal3g,
  getNotRnewJawwal3g,
  chargeJawwal,
})(Jawwal3g);
