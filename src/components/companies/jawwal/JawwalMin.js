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
  const onClickType3Min = (e) => {
    e.preventDefault();
    chargeJawwal(
      {
        jawwal3g: jawwal3g || null,
        jawwalRom: jawwalRom || null,
        jawwalCredit: credit || null,
        jawwalMin: selected || null,
      },
      history,
      pushHistory
    );
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
    getRnewJawwalMin();
    setIsRenew(true);
    setIsNotRenew(false);
  };
  const onNotRenewClick = () => {
    getNotRnewJawwalMin();
    setIsNotRenew(true);
    setIsRenew(false);
  };
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
              <div className="col-3" style={{paddingLeft:0}}>
                <div className="card jawwal-back">
                  <div className="m-3">
                    <h1 className="jawwal-text m-4">{translate("jawwalMin")}</h1>
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="card nav-layout">
                  <div className="form-group row">
                    <label className="mt-2 col-md-5 col-sm-12 col-form-label mobile-semi">
                      <button className={`btn btn-light main-text mx-2 refersh-but`} onClick={refreshClick}>
                        {translate("refresh")}
                      </button>
                      {translate("jawwalOfferMin")}
                    </label>
                    <label
                      className="mt-2 col-md-3 col-sm-12 col-form-label mobile-semi"
                      style={{ fontFamily: "initial", fontSize: "1.6rem" }}
                    >
                      {mobileNo}
                    </label>
                    <label
                      className="col-md-4 col-sm-12 col-form-label mobile-semi"
                      style={{ fontFamily: "initial", fontSize: "2rem" }}
                    >
                      <button
                        className={`btn btn-light main-text mx-1 ${isRenew ? "selected-btn" : null}`}
                        onClick={onRenewClick}
                      >
                        {translate("Renewable")}
                      </button>
                      <button
                        className={`btn btn-light main-text mx-1 ${isNotRenew ? "selected-btn" : null}`}
                        onClick={onNotRenewClick}
                      >
                        {translate("notRenew")}
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
          <div className=" card position-relative">
            <div className="card m-4s fixed-top1 position-sticky mt-2">
              <div className=" row mt-1 fixed-topx">
                {credit !== "" && (
                  <div className="col-lg-4 col-md-4 col-sm-4 mt-4 ">
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
                        {/* {credit.price} */}
                      </div>
                    </div>
                  </div>
                )}
                {jawwalRom !== "" && (
                  <div className="col-lg-4 col-md-4 col-sm-6 col-6 mt-4">
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
                {jawwal3g !== "" && (
                  <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
                    <div className="card outer-wrapper ">
                      <div className="frame1">
                        <img alt="sssssssssss" src={jawwal3g.url} width="260px" height="100px"></img>
                        <a className="close-btn">
                          <i class="fa fa-times" aria-hidden="true" onClick={onJawwal3gRemove}></i>
                        </a>
                        {/* {jawwal3g.des} */}
                      </div>
                    </div>
                  </div>
                )}
                {selected !== "" && (
                  <div className="col-lg-4 col-md-4 col-sm-4 mt-4 mb-4">
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
                      (jawwal3g.price ? parseFloat(jawwal3g.price) : 0) +
                      (credit.price ? parseFloat(credit.price) : 0)}
                  </label>
                </div>
                <button
                  type="submit"
                  class={`col-sm-2 btn btn sign-but ${
                    (selected.price ? parseFloat(selected.price) : 0) +
                      (jawwalRom.price ? parseFloat(jawwalRom.price) : 0) +
                      (jawwal3g.price ? parseFloat(jawwal3g.price) : 0) +
                      (credit.price ? parseFloat(credit.price) : 0) ===
                      0 && "disabled"
                  }`}
                  onClick={onClickType3Min}
                >
                  {translate("accept")}
                </button>
              </div>
            </form>
            <hr className="mt-3" style={{ border: "2px solid #000", fontWeight: "bolder" }} />
            <div className="row">
              {loading && (
                <Spinner/>
              )}
              {jawwalMin && jawwalMin.length === 0 && !loading ? (
                <div className="d-flex justify-content-center mt-3">
                  <h1 className="warning-text">No available bundles</h1>
                </div>
              ) : (
                jawwalMin.map((item) => (
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
                            data-target={"#" + item.ID}
                            aria-expanded="true"
                            aria-controls={item.ID}
                          >
                            <small>{translate("Details")}</small>
                          </a>
                        </h5>
                      </div>

                      <div id={item.ID} class="collapse hidden" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                          {translate("ID")}:{item.ID}
                          <br/>
                          {item.des}
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
