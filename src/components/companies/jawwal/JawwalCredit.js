import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import TextFieldGroup from "./../../common/TextFieldGroup";
import { getJawwalCredit, chargeJawwal } from "../../../actions/companiesAction";
import "./jawwal.css";
import credit from "./credit";
import SubNav from "./SubNav";

const JawwalCredit = ({ getJawwalCredit, auth, jawwalCreadit, loading, chargeJawwal }) => {
  const history = useHistory().location.pathname;
  const pushHistory = useHistory();

  const [mobileNo, setMobileNo] = useState(
    history.split("/")[3].slice(3, 6) +
      "-" +
      history.split("/")[3].slice(6, 9) +
      "-" +
      history.split("/")[3].slice(9, 13)
  );
  const [inputForm, setInputForm] = useState({
    dis: "",
    price: null,
    url: null,
    id: "",
  });
  const [selected, setSelected] = useState({});
  const [jawwal3g, setJawwal3g] = useState("");
  const [jawwalRom, setJawwalRom] = useState("");
  const [jawwalMin, setJawwalMin] = useState("");
  useEffect(() => {
    document.title = "Home /Credit Jawwal";
    // console.log(auth, jawwalCreadit);
    if (localStorage.jawwalMin) {
      setJawwalMin(JSON.parse(localStorage.jawwalMin));
    }
    if (localStorage.jawwal3g) {
      setJawwal3g(JSON.parse(localStorage.jawwal3g));
    }
    if (localStorage.JawwalCredit) {
      setSelected(JSON.parse(localStorage.JawwalCredit));
    }
    if (localStorage.JawwalRom) {
      setJawwalRom(JSON.parse(localStorage.JawwalRom));
    }
  }, []);
  const onClickTypeCredit = (e) => {
    e.preventDefault();
    chargeJawwal(
      {
        jawwal3g: jawwal3g || null,
        jawwalRom: jawwalRom || null,
        jawwalCredit: selected || null,
        jawwalMin: jawwalMin || null,
      },
      history,
      pushHistory
    );
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
    setSelected({ price: e.target.value });
    localStorage.JawwalCredit = JSON.stringify({ price: e.target.value });
  };
  const onTypeClick = (item) => {
    localStorage.JawwalCredit = JSON.stringify(item);
    setSelected(item);
    // addChargeJawwal(item);
  };
  const onCreditRemove = () => {
    localStorage.removeItem("JawwalCredit");
    setSelected("");
    setInputForm({ ...inputForm, ["price"]: 0 });
  };
  const onJawwal3gRemove = () => {
    localStorage.removeItem("jawwal3g");
    setJawwal3g("");
  };
  const onJawwalRomRemove = () => {
    localStorage.removeItem("JawwalRom");
    setJawwalRom("");
  };
  const onJawwalMinRemove = () => {
    localStorage.removeItem("jawwalMin");
    setJawwalMin("");
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="">
            <div className="row mt-2">
              <div className="col-3" style={{paddingLeft:0}}>
                <div className="card jawwal-back">
                  <h1 className="jawwal-text">{translate("jawwalCredit")}</h1>
                </div>
              </div>
              <div className="col-9">
                <div className=" card nav-layout">
                  <div className="form-group row px-2">
                    <div className="col-md-6 col-sm-12 col-form-label mobile-semi">
                      <i class="fas fa-phone" style={{fontSize: "1.4rem"}}></i>
                      <span style={{fontSize: "1.6rem", marginRight: 10, marginLeft: 10, marginTop: 5, display: "inline-block"}}>{mobileNo}</span>
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
              <div className="row">
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
                        onClick={onClickTypeCredit}
                      >
                        {translate("accept")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-10">
                  <div className="card m-4s fixed-top1 position-sticky mt-2">
                    <div className="row mt-1 fixed-topx">
                      {selected !== {} && selected.price && (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-4">
                        <div className="card outer-wrapper px-3">
                          <div className="frame1">
                            <img
                              alt="sssssssssss"
                              src={
                                selected.url ||
                                "https://res.cloudinary.com/dtu4lltbk/image/upload/v1622203339/eced7efa-a16b-4fdd-9528-2c1f10356e1c_lzfhei.jpg"
                              }
                              width="260px"
                              height="100px"
                            ></img>
                            {!selected.url && <label className="text-abs">{selected.price}</label>}
                            <a className="close-btn" onClick={onCreditRemove}>
                              <i class="fa fa-times" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {jawwalRom !== "" && (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-4">
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
                    {jawwalMin !== "" && (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-4">
                        <div className="card outer-wrapper  px-3">
                          <div className="frame1">
                            <img alt="sssssssssss" src={jawwalMin.url} width="260px" height="100px"></img>
                            <a className="close-btn" onClick={onJawwalMinRemove}>
                              <i class="fa fa-times" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {jawwal3g !== "" && (
                      <div className="col-lg-3 col-md-4 col-sm-4 mt-4">
                        <div className="card outer-wrapper  px-3">
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
              </div>

              <hr className="mt-3" style={{ border: "2px solid #42ace3", backgroundColor: "#42ace3", fontWeight: "bolder" }} />
              
              <div class="form-group row d-flex justify-content-start">
                <label for="colFormLabelLg" class="col-sm-1 col-form-label col-form-label-lg">
                  {translate("SpecificCredit")}
                </label>
                <div className="col-md-4">
                  <TextFieldGroup
                    style={{ width: "100%" }}
                    className="mb-5"
                    name="price"
                    type="number"
                    value={inputForm.price}
                    onChange={onChange}
                  />
                </div>
              </div>

              <hr className="mt-3" style={{ border: "2px solid #42ace3", backgroundColor: "#42ace3", fontWeight: "bolder" }} />

              <div className="row ">
                {credit.map((item) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 col-6 mt-1 ">
                    <div className="card outer-wrapper charge-card">
                      <a
                        style={{ cursor: "pointer" }}
                        data-placement="top"
                        title={item && item.des}
                        onClick={() => onTypeClick(item)}
                      >
                        <div className="frame">
                          <img
                            src={item.url}
                            // width="100px"
                            // height="50px"
                          ></img>
                          {item && item.des}
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
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
  jawwalCreadit: state.companies.jawwalCreadit,
  loading: state.companies.loading,
});

export default connect(mapStateToProps, { getJawwalCredit, chargeJawwal })(JawwalCredit);
