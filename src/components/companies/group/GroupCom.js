import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import { getGroupesData, chargeGrpupCompany } from "../../../actions/companiesAction";
import "./group.css";
import Spinner from "../../ui/spinner/Spinner";
import { isArray, isEmpty, isNil } from "lodash";
import Badge from "../../ui/Badge/Badge";

const GroupCom = ({ getGroupesData, companies, loading, chargeGrpupCompany }) => {
  const history = useHistory();
  const [selected, setSelected] = useState();
  const [typeCompany, setTypeCompany] = useState(history.location.pathname.split("/")[3]);
  const mobileNo = history.location.pathname.split("/")[4];
  const formattedMobileNumber = mobileNo.slice(0, 3) + "-" + mobileNo.slice(3, 6) + "-" + mobileNo.slice(6, 10);
  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-4");
  const [loadingSpinner, isLoading] = useState(false);

  useEffect(() => {
   getGroupesData(typeCompany);
    document.title = history.location.pathname.split("/")[3] + " | Phone Play";
    refreshColumnStyle();
  }, []);
  const onTypeClick = (item) => {
    topDiv.scrollIntoView({ behavior: "smooth" });
    setSelected(item);
  };
  const onChargeClick = (e) => {
    e.preventDefault();
    isLoading(true);
    
    chargeGrpupCompany(typeCompany, mobileNo, selected, history)
    .finally(() => {
      clearSelected();
      isLoading(false);
    });
  };
  const clearSelected = () => {
    setSelected(null);
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
      setColumnStyle("col-lg-3 col-md-4 col-sm-6 col-6  card-md");
      break;
      case "column6":
      setColumnStyle("col-lg-2 col-md-2 col-sm-4 col-6 card-sm");
      break;
    }
  }
  const refreshClick = () => {
    getGroupesData(typeCompany);
  };
  let topDiv = null;

  return (
    <div className="container" ref={(ref)=> topDiv = ref}>
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="">
            <div className="row mt-2">
              <div className="col-3">
                <div className={`card group-back ${typeCompany}-back`}></div>
              </div>
              <div className="col-9">
                <div className=" card nav-layout">
                <div className="form-group row px-2">
                    <div className="col-md-6 col-sm-12 col-form-label mobile-semi">
                      <i class="fas fa-phone" style={{fontSize: "1.4rem"}}></i>
                      <span style={{fontSize: "1.6rem", marginRight: 10, marginLeft: 10, marginTop: 5, display: "inline-block"}}>{formattedMobileNumber}</span>
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

            <div className="position-relative">
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-10">
                      <div className="card m-4s fixed-top1 position-sticky mt-2">
                        <div className="row mt-1 fixed-topx px-3">
                          {!isNil(selected) && !isEmpty(selected) && (
                            <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                              <div className="card outer-wrapper">
                                <div className="frame1">
                                  <img
                                    alt={`${typeCompany} Bundle`}
                                    src={selected.url}
                                    width="260px"
                                    height="100px"
                                  ></img>
                                  <a className="close-btn" onClick={clearSelected}>
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
                          <h3 class="text-info mt-2">₪ {(selected?.amount ? parseFloat(selected?.amount) : 0)}</h3>
                          <button
                            type="submit"
                            class={`mx-2 btn btn sign-but ${!selected && "disabled"}`}
                            onClick={onChargeClick}
                          >
                            {translate("accept")}
                          </button>
                          {loadingSpinner && <Spinner />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-3" style={{ border: "2px solid #42ace3", backgroundColor: "#42ace3", fontWeight: "bolder" }} />

              <div className="card list-cards">
                <div className="row">
                  {loading && (
                    <Spinner/>
                  )}
                  {!isArray(companies) && !loading ? (
                    <div className="d-flex justify-content-center mt-3">
                      <h2 className="text-info">{translate("No available bundles")}</h2>
                    </div>
                  ) : (
                    companies.map((item, index) => (
                      <div className={`${columnStyle} mt-3`}>
                        <div className="card charge-card">
                          <a
                            style={{ cursor: "pointer" }}
                            data-placement="top"
                            onClick={() => onTypeClick(item)}
                          >
                            <div className="position-relative">
                              <img
                                alt={item.title}
                                src={item.url}
                                width={190}
                              ></img>
                              {(item.renew === "True" || item.renew === "true") && (
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
                              <small>{item.title}</small>
                              <br />
                              <small>{item.des}</small>
                              <br/>
                              [{translate("ID")}:{item.PID}]
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  companies: state.companies.groupCompaneis,
  loading: state.companies.loading,
});

export default connect(mapStateToProps, { getGroupesData, chargeGrpupCompany })(GroupCom);
