import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import { getGroupesData, chargeGrpupCompany } from "../../../actions/companiesAction";
import "./group.css";
import Spinner from "../../ui/spinner/Spinner";

const GroupCom = ({ getGroupesData, groupCompaneis, loading, chargeGrpupCompany }) => {
  const history = useHistory();
  const [selected, setSelected] = useState();
  const [typeCompany, setTypeCompany] = useState(history.location.pathname.split("/")[3]);
  const mobileNo = history.location.pathname.split("/")[4];
  useEffect(() => {
    getGroupesData(typeCompany);
    document.title = "PhonePlay/ " + history.location.pathname.split("/")[3];
  }, []);
  const onTypeClick = (item) => {
    setSelected(item);
  };
  const onChargeClick = () => {
    chargeGrpupCompany(typeCompany,mobileNo ,selected,history);

  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
            <div
              className={`card ${typeCompany === "cellcom" && "cellcom-back"} 
            ${typeCompany === "pelephone" && "pelephone-back"} 
            ${typeCompany === "partner" && "partner-back"}
            ${typeCompany === "golan" && "golan-back"}
            ${typeCompany === "mobile012" && "mobile12-back"}
            `}
            >
              <div className="row">
                <div className=" col-5 m-3">
                  <h1 className="group-text m-4">{translate(typeCompany)}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className=" card jawwal-layout">
              <div className="form-group row m-2s">
                <div className="col-sm-2 mt-2 mx-3">
                  <button
                    onClick={() => history.push(`/company/group/${typeCompany}`)}
                    className="btn rom-selected mx-4 mt-1 "
                  >
                    {translate("Back")}
                  </button>
                </div>
                <label className="mt-1  mo-text col-md-5 col-sm-12 col-form-label mobile-semi">
                  {translate("mobileNo")}:
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
                <img className="" alt="" src={selected.url} 
                height='100'
                />
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
              groupCompaneis&&groupCompaneis.map((item) => (
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
                          data-target={"#" + item.SPID}
                          aria-expanded="true"
                          aria-controls={item.SPID}
                        >
                          <small>{translate("Details")}</small>
                        </a>
                      </h5>
                    </div>

                    <div
                      id={item.SPID}
                      className="collapse hidden"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <small>{item.title}</small>
                        <br />
                        <small>{item.des}</small>
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
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  groupCompaneis: state.companies.groupCompaneis,
  loading: state.companies.loading,
});

export default connect(mapStateToProps, { getGroupesData, chargeGrpupCompany })(GroupCom);
