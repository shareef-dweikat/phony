import { useState, useEffect } from "react";
import SideBar from "../homePage/SideBar";
import { Link, useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import "./report.css";
const Report = () => {
  const history = useHistory().location.pathname;

  const [dateForm, setDateForm] = useState({
    from: "",
    to: "",
  });
  useEffect(() => {
    document.title = "Report | Phone Play";
  }, []);
  const onChangeDate = (e) => {
    setDateForm({ ...dateForm, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
            <div className="card card-home">
                          <div className="card img-back" style={
                sessionStorage.getItem("main_picture") ? {backgroundImage: `url("${sessionStorage.getItem("main_picture")}")` } : {}
              }>
                <h1 className="header-text">
                  {translate("Report")}
                </h1>
              </div>
            </div>
            <div className="card mt-2">
              <div className="row mb-2 mt-2">
                <div className="col-sm-1"></div>
                <label
                  for="inputEmail3"
                  className="col-sm-2 col-form-label m-1"
                >
                  <Link
                    className={`semi-nav ${
                      history === "/report" && "active-semi"
                    } m-4`}
                  >
                    {translate("sales")}
                  </Link>
                </label>
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  <Link className="semi-nav">{translate("profit")}</Link>
                </label>
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  <Link className="semi-nav">{translate("refund")}</Link>
                </label>
                <label for="inputEmail3" className="col-sm-3 col-form-label">
                  <Link className="semi-nav">
                    {" "}
                    {translate("runingBalance")}
                  </Link>
                </label>
              </div>
            </div>
            <div className="mt-5">
              <div className="row">
                <div className="form-group row">
                  <label className="col-sm-1 col-form-label">
                    {translate("from")}
                  </label>
                  <div className="col-sm-4">
                    <input
                      name="from"
                      value={dateForm.from}
                      type="date"
                      className="form-control"
                      onChange={(e) => onChangeDate(e)}
                    />
                  </div>
                  <label className="col-sm-1 col-form-label">
                    {translate("to")}
                  </label>
                  <div className="col-sm-4">
                    <input
                      name="to"
                      value={dateForm.to}
                      type="date"
                      className="form-control"
                      onChange={(e) => onChangeDate(e)}
                    />
                  </div>
                  <div className="col-sm-2">
                    <button className="btn sign-but">
                      {translate("search")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="form-group row">
                <label className="col-sm-1 col-form-label">
                  {translate("number")}
                </label>
                <div className="col-sm-4">
                  <input type="number" className="form-control" />
                </div>
                <label className="col-sm-1 col-form-label">
                  {translate("show")}
                </label>
                <div className="col-sm-4">
                  <input type="number" className="form-control" />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col text-center" style={{ width: "170px" }}>
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("transactionNo")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("mobileNo")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("value")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("status")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("time")}
                    </th>
                    <th scope="col text-center">{translate("restoration")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td className="text-center">Mark</td>
                    <td className="text-center">Otto</td>
                    <td className="text-center">@mdo</td>
                    <td className="text-center">@mdo</td>
                    <td className="text-center">@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td className="text-center">Jacob</td>
                    <td className="text-center">Thornton</td>
                    <td className="text-center">@fat</td>
                    <td className="text-center">@fat</td>
                    <td className="text-center">@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td className="text-center">Larry</td>
                    <td className="text-center">the Bird</td>
                    <td className="text-center">@twitter</td>
                    <td className="text-center">@twitter</td>
                    <td className="text-center">@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* {translate("test")} */}
      </div>
    </div>
  );
};

export default Report;
