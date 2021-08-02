import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import SubNav from "./SubNav";
import { getJawwalRom, chargeJawwal } from "../../../actions/companiesAction";
import Spinner from "../../ui/spinner/Spinner";

const JawwalRom = ({ getJawwalRom, loading, jawwalRom, chargeJawwal }) => {
  const history = useHistory().location.pathname;
  const pushHistory = useHistory();

  const [typeRoming, setTypeRoming] = useState("Jordan");
  const [mobileNo, setMobileNo] = useState(
    history.split("/")[3].slice(3, 6) +
      "-" +
      history.split("/")[3].slice(6, 9) +
      "-" +
      history.split("/")[3].slice(9, 13)
  );
  const [selected, setSelected] = useState("");
  const [jawwalMin, setJawwalMin] = useState("");
  const [credit, setCredit] = useState("");
  const [jawwal3g, setJawwal3g] = useState("");
  useEffect(() => {
    getJawwalRom(mobileNo, false);
    document.title = "Home /Rom Jawwal";
    if (localStorage.jawwal3g) {
      setJawwal3g(JSON.parse(localStorage.jawwal3g));
    }
    if (localStorage.jawwalMin) {
      setJawwalMin(JSON.parse(localStorage.jawwalMin));
    }
    if (localStorage.JawwalCredit) {
      setCredit(JSON.parse(localStorage.JawwalCredit));
    }
    if (localStorage.JawwalRom) {
      setSelected(JSON.parse(localStorage.JawwalRom));
    }
  }, []);
  const onClickTypeRom = (e) => {
    e.preventDefault();
    chargeJawwal(
      {
        jawwal3g: jawwal3g || null,
        jawwalRom: selected || null,
        jawwalCredit: credit || null,
        jawwalMin: jawwalMin || null,
      },
      history,
      pushHistory
    );
  };
  const selectTypeClick = (type) => {
    setTypeRoming(type);
  };
  const onTypeClick = (item) => {
    localStorage.JawwalRom = JSON.stringify(item);
    setSelected(item);
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
    setJawwalMin("");
  };
  const onJawwalRomRemove = () => {
    localStorage.removeItem("JawwalRom");
    setSelected("");
  };
  const refreshClick = () => {
    getJawwalRom(mobileNo, false);
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
                  <h1 className="jawwal-text">{translate("jawwalRom")}</h1>
                </div>
              </div>
              <div className="col-9">
                <div className=" card nav-layout">
                  <div className="form-group row">
                    <label className="my-1 col-md-5 col-sm-12 col-form-label mobile-semi">
                      <button className={`btn btn-light main-text mx-2 refersh-but`} onClick={refreshClick}>
                        {translate("refresh")}
                      </button>
                      {translate("jawwalOfferRoming")}
                    </label>
                    <label
                      className="my-1 col-md-3 col-sm-12 col-form-label mobile-semi"
                      style={{ fontFamily: "initial", fontSize: "1.6rem" }}
                    >
                      {mobileNo}
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
                  <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
                    <div className="card outer-wrapper px-3 ">
                      <div className="frame1">
                        <img alt="sssssssssss" src={selected.url} width="260px" height="100px"></img>
                        <a className="close-btn">
                          <i class="fa fa-times" aria-hidden="true" onClick={onJawwalRomRemove}></i>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {jawwal3g !== "" && (
                  <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
                    <div className="card outer-wrapper px-3">
                      <div className="frame1">
                        <img alt="sssssssssss" src={jawwal3g.url} width="260px" height="100px"></img>
                        <a className="close-btn" onClick={onJawwal3gRemove}>
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {credit !== "" && (
                  <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
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
                  <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
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
                      (credit.price ? parseFloat(credit.price) : 0) +
                      (jawwal3g.price ? parseFloat(jawwal3g.price) : 0) +
                      (jawwalMin.price ? parseFloat(jawwalMin.price) : 0)}
                  </label>
                </div>
                <button
                  type="submit"
                  class={`col-sm-2 btn btn sign-but ${
                    (selected.price ? parseFloat(selected.price) : 0) +
                      (credit.price ? parseFloat(credit.price) : 0) +
                      (jawwal3g.price ? parseFloat(jawwal3g.price) : 0) +
                      (jawwalMin.price ? parseFloat(jawwalMin.price) : 0) ===
                      0 && "disabled"
                  } `}
                  onClick={onClickTypeRom}
                >
                  {translate("accept")}
                </button>
              </div>
            </form>
            <hr className="mt-2" style={{ border: "2px solid #000", fontWeight: "bolder" }} />
            <div className="card">
              <div
                className="d-flex justify-content-between mx-3 type-rom"
                style={{ fontFamily: "initial", fontSize: "2rem" }}
              >
                {/* <label
                  className="  col-md-12 col-sm-12 col-form-label mobile-semi"
                > */}
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
            <div className="card">
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
                    .map((item) => (
                      <div className="col-lg-3 col-md-4 col-sm-6 col-6 mt-4 ">
                        <div className="card outer-wrapper charge-card">
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
                                data-target={"#" + item.ID}
                                aria-expanded="true"
                                aria-controls={item.ID}
                              >
                                <small>{translate("Details")}</small>{" "}
                              </a>
                            </h5>
                          </div>
                          <div
                            id={item.ID}
                            class="collapse hidden"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div class="card-body">{item.des}</div>
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
export default connect(mapStateToProps, { getJawwalRom, chargeJawwal })(JawwalRom);
