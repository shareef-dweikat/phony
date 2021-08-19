import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import { getHot, ChargeHot } from "../../../actions/companiesAction";
import Spinner from "../../ui/spinner/Spinner";

const Hot = ({ getHot, ChargeHot, hot, loading }) => {
  const history = useHistory();
  const [selected, setSelected] = useState();
  const mobileNo = history.location.pathname.split("/")[3];
  useEffect(() => {
    getHot(mobileNo);
    document.title = "Azy | Phone Play";
  }, []);
  const onTypeClick = (item) => {
    // chargeGrpupCompany();
    setSelected(item);
  };
  const onChargeClick = () => {
    ChargeHot(selected, history);
  };
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <SideBar />
          </div>
          <div className="col-lg-9 col-md-8 col-sm-6">
            <div className="card ooredoo-back">
              <div className="row">
                <div className=" col-5 m-3 mt-4">
                  <h1 className="jawwal-text m-4">{translate("hotMobile")}</h1>
                </div>
                <div className=" col-2"></div>
                <div className=" col-4 d-flex align-items-center">
                  <img
                    src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131544/Hotmobilelogo.svg_gjfklv.png"
                    width="120"
                    height="50"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className=" card jawwal-layout">
                <div className="form-group row">
                  <div className="col-sm-2 mt-1">
                  <button onClick={() => history.push(`/company/azy/`)} className="btn rom-selected mx-4 mt-2 ">
                      {translate("Back")}
                    </button>
                  </div>
                  <label className="mt-1  mo-text col-md-5 col-sm-12 col-form-label mobile-semi">
                    {translate("Mobile No.")}:
                  </label>
                  <label
                    className=" mt-1 col-md-3 col-sm-12 col-form-label mobile-semi"
                    style={{ fontFamily: "initial", fontSize: "1.8rem" }}
                  >
                    {mobileNo.slice(0, 3) + "-" + mobileNo.slice(3, 6) + "-" + mobileNo.slice(6, 10)}
                  </label>
                </div>
              </div>
            </div>
            <div className="row my-3 mx-4">
              {selected ? (
                <div className="col-sm-5">
                  <img className="" alt="" src={selected.url} />
                </div>
              ) : null}
              <div className="col-sm-6">
                <div className=" d-flex justify-content-between">
                  <div>
                    <label class="col-form-label-lg">{translate("total")}</label>
                  </div>
                  <div>
                    <label class="col-form-label-lg ">{(selected && selected.amount) || "0"}</label>
                  </div>
                  <button
                    type="submit"
                    class={`mx-2 btn btn sign-but ${!selected && "disabled"}`}
                    onClick={onChargeClick}
                  >
                    {translate("accept")}
                  </button>
                </div>
              </div>
            </div>
            <hr className="mt-3" style={{ border: "2px solid #000", fontWeight: "bolder" }} />
            <div className="row">
              {loading === true ? (
                <Spinner/>
              ) : (
                hot.map((item) => (
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
                      <div className="text-center" id="headingOne">
                        <h5 className="mb-0 mx-">
                          <a
                            className="link-main details"
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
                        className="collapse hidden"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <small>{item.bundle_name}</small>
                          <br />
                          <small>{item.bundle_description}</small>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  hot: state.companies.hot,
  loading: state.companies.loading,
});
export default connect(mapStateToProps, { getHot, ChargeHot })(Hot);
