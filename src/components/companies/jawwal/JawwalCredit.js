import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import TextFieldGroup from "./../../common/TextFieldGroup";
import { getJawwalCredit, chargeJawwal } from "../../../actions/companiesAction";
import "./jawwal.css";
import credits, { EMPTY_CREDIT } from "./credits";
import SubNav from "./SubNav";
import Spinner from "../../ui/spinner/Spinner";
import Badge from "../../ui/Badge/Badge";
import Summary from "../../ui/Summary/Summary";

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
  const [loadingSpinner, isLoading] = useState(false);
  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 col-6");

  useEffect(() => {
    document.title = "Home /Credit Jawwal";
    // console.log(auth, jawwalCreadit);
    if (localStorage.JawwalMin) {
      setJawwalMin(JSON.parse(localStorage.JawwalMin));
    }
    if (localStorage.Jawwal3g) {
      setJawwal3g(JSON.parse(localStorage.Jawwal3g));
    }
    if (localStorage.JawwalCredit) {
      setSelected(JSON.parse(localStorage.JawwalCredit));
    }
    if (localStorage.JawwalRom) {
      setJawwalRom(JSON.parse(localStorage.JawwalRom));
    }
    refreshColumnStyle();
  }, []);
  
  const onClickTypeCredit = (e) => {
    e.preventDefault();
    isLoading(true);
    chargeJawwal(
      {
        jawwal3g: jawwal3g || null,
        jawwalRom: jawwalRom || null,
        jawwalCredit: selected || null,
        jawwalMin: jawwalMin || null,
      },
      history,
      pushHistory
    )
    .finally(() => {
      isLoading(false);
    });
  };
  const onChange = (e) => {
    console.log(e.target.value);
    const selectedCredit = { ...EMPTY_CREDIT, price: e.target.value };
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
    setSelected(selectedCredit);
    localStorage.JawwalCredit = JSON.stringify(selectedCredit);
  };
  const onTypeClick = (item) => {
    localStorage.JawwalCredit = JSON.stringify(item);
    setSelected(item);
  };
  const onCreditRemove = () => {
    localStorage.removeItem("JawwalCredit");
    setSelected("");
    setInputForm({ ...inputForm, ["price"]: 0 });
  };
  const onJawwal3gRemove = () => {
    localStorage.removeItem("Jawwal3g");
    setJawwal3g("");
  };
  const onJawwalRomRemove = () => {
    localStorage.removeItem("JawwalRom");
    setJawwalRom("");
  };
  const onJawwalMinRemove = () => {
    localStorage.removeItem("JawwalMin");
    setJawwalMin("");
  };

  const onRemove = (type) => {
    console.log("type", type);
    switch(type) {
      case "JawwalCredit":
        onCreditRemove();
        break;
      case "JawwalMin":
        onJawwalMinRemove();
        break;
      case "Jawwal3g":
        onJawwal3gRemove();
        break;
      case "JawwalRom":
        onJawwalRomRemove();
        break;
    }
  }

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
          <div className="">
            <div className="row mt-2">
              <div className="col-3">
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
                <div className="col-10">
                  <div className="card m-4s fixed-top1 position-sticky mt-2">
                    <div className="row mt-1 fixed-topx px-3">
                      {selected !== {} && selected.price && (
                        <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                          <div className="card outer-wrapper">
                            <div className="frame1">
                              <img
                                alt="Jawwal Credit"
                                src={
                                  selected.url ||
                                  "https://res.cloudinary.com/dtu4lltbk/image/upload/v1622203339/eced7efa-a16b-4fdd-9528-2c1f10356e1c_lzfhei.jpg"
                                }
                                width="260px"
                                height="100px"
                              ></img>
                              {selected.flexiblePrice && <label className="text-abs">{selected.price}</label>}
                              <a className="close-btn" onClick={onCreditRemove}>
                                <i class="fa fa-times" aria-hidden="true"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      {jawwalMin !== "" && (
                        <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                          <div className="card outer-wrapper">
                            <div className="frame1">
                              <img alt="Jawwal Min" src={jawwalMin.url} width="260px" height="100px"></img>
                              {(jawwalMin.renew === "True" || jawwalMin.renew === "true") && (
                                <Badge text={translate("Renewable")}></Badge>
                              )}
                              <a className="close-btn" onClick={onJawwalMinRemove}>
                                <i class="fa fa-times" aria-hidden="true"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      {jawwal3g !== "" && (
                        <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                          <div className="card outer-wrapper">
                            <div className="frame1">
                              <img alt="Jawwal 3G" src={jawwal3g.url} width="260px" height="100px"></img>
                              {(jawwal3g.renew === "True" || jawwal3g.renew === "true") && (
                                <Badge text={translate("Renewable")}></Badge>
                              )}
                              <a className="close-btn">
                                <i class="fa fa-times" aria-hidden="true" onClick={onJawwal3gRemove}></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      {jawwalRom !== "" && (
                        <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                          <div className="card outer-wrapper">
                            <div className="frame1">
                              <img alt="Jawwal Rom" src={jawwalRom.url} width="260px" height="100px"></img>
                              <a className="close-btn" onClick={onJawwalRomRemove}>
                                <i class="fa fa-times" aria-hidden="true"></i>
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
                    <div class="card-body p-2">
                      <h5 class="text-muted mt-1 mb-2" title="Balance" style={{fontSize: "1.2rem" }}>{translate("total")}</h5>
                      <h3 class="text-info mt-2">₪ {(selected.price ? parseFloat(selected.price) : 0) +
                        (jawwalRom.price ? parseFloat(jawwalRom.price) : 0) +
                        (jawwal3g.price ? parseFloat(jawwal3g.price) : 0) +
                        (jawwalMin.price ? parseFloat(jawwalMin.price) : 0)}
                      </h3>
                      <button
                        type="submit"
                        class={`btn btn-success ${
                          (selected.price ? parseFloat(selected.price) : 0) +
                            (jawwalRom.price ? parseFloat(jawwalRom.price) : 0) +
                            (jawwal3g.price ? parseFloat(jawwal3g.price) : 0) +
                            (jawwalMin.price ? parseFloat(jawwalMin.price) : 0) ===
                            0 && "disabled"
                        }`}
                        style={{margin: "auto", display: "block"}}
                        disabled={loadingSpinner}
                        onClick={onClickTypeCredit}
                      >
                        {translate("accept")}
                      </button>
                      {loadingSpinner && <Spinner />}
                    </div>
                  </div>
                </div>
              </div>

              {/* <Summary selectedItems={{
                JawwalCredit :selected,
                JawwalMin: jawwalMin,
                JawwalRom: jawwal3g,
                Jawwal3g: jawwalRom,
              }}
              onRemove={onRemove}/> */}

              <hr className="mt-3" style={{ border: "2px solid #42ace3", backgroundColor: "#42ace3", fontWeight: "bolder" }} />

              <div className="row ">
                {credits.map((item) => (
                  <div className={`${columnStyle} my-2`}>
                    <div className="card outer-wrapper charge-card">
                      <a
                        style={{ cursor: "pointer" }}
                        data-placement="top"
                        title={item && item.des}
                        onClick={() => onTypeClick(item)}
                      >
                        <div className="card">
                          <img
                            src={item.url}
                          ></img>
                          {item && item.des}
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
                <div className={`${columnStyle} my-2`}>
                  <div class="card card-credit outer-wrapper">
                    <a
                      style={{ cursor: "pointer" }}
                      data-placement="top"
                      title="custom credit"
                      onClick={() => onTypeClick({...EMPTY_CREDIT, price: inputForm.price})}
                    >
                      <div class="card">
                        <img src={EMPTY_CREDIT.url}></img>
                        <TextFieldGroup
                          style={{ 
                            width: "calc(50% - 20px)", height: "70%", padding: 0,
                            position: "absolute", top: "50%", left: "calc(50% + 12px)",
                            transform: "translateY(-50%)",
                            fontSize: "2rem", fontFamily: '"Montserrat", sans-serif', textAlign: "center",
                            outline: "rgb(16, 16, 16) auto 4px", 
                          }}
                          className="mb-5"
                          name="price"
                          type="number"
                          value={inputForm.price}
                          onChange={onChange}
                        />
                      </div>
                    </a>
                  </div>
                </div>
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
