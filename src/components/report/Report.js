import { useState, useEffect } from "react";
import SideBar from "../homePage/SideBar";
import { Link, useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import { getSellerReports } from "../../actions/reportsAction";
import { getDiscounts } from "../../actions/discountsAction";
import "./report.css";
import { connect } from "react-redux";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import {  cancelTransction } from "../../actions/reportsAction";

import Dropdown from 'react-select';
import { Button } from "react-bootstrap";

import Spinner from "../ui/spinner/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
const Report = ({
  sellerReports,
  getSellerReports,
  discounts,
  getDiscounts,
}) => {
  const history = useHistory().location.pathname;
  console.log(sellerReports, "sellerReportsssss");
  const options = [
    { value: '', label: translate("All")},
    { value: 'topup', label: translate("topup") },
    { value: 'cancelation', label: translate("cancelation") },
    { value: 'add credits', label: translate("add credits") },
  ];
  const defaultOption = "";

  const transStatusOptions = [
    { value: '', label: translate("All")},
    { value: 'success', label: translate("success") },
    { value: 'failed', label: translate("failed") },
    { value: 'pending', label: translate("pending") },
  ];
  const defaultTransStatusOptions = "";

  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());

  const [phone, setPhone] = useState("");
  const [transType, setTransType] = useState("All");
  const [transStatus, setTransStatus] = useState("All");
  const [transId, setTransId] = useState("");
  const [cardId, setCardId] = useState("");
  const [amount, setAmount] = useState("");
  const [renew, setAutoRenew] = useState("");
  const [provider, setProvider] = useState("");
  const [companies, setCompanies] = useState("");

  const [cancelRequest, setCancelRequests] = useState("");
  const [canceled, setCanceled] = useState("");

  const [loading, isLoading] = useState(false);

  useEffect(() => {
    document.title = "Report | Phone Play";
    // const companiesTemp = Object.keys(JSON.parse(localStorage.getItem("companies"))).map((item)=> {
    //   if(item === 'jawwal' || item === 'ooredoo' || item === 'cellcom' || item === 'pelephone' || item === 'golan' || item === 'mobile012'  || item === 'azy'  || item === 'hot' || item === 'partner')
    //      return {value: item, label: item}
    // })
    // companiesTemp.push({value: 'ddddddddd', label: 'itedddddddddddddddddddddm'})
    // setCompanies(companiesTemp)
  }, []);

  useEffect(() => {
    getDiscounts();
  }, []);

  useEffect(() => {
    let providers = [];
    providers = discounts?.map((provider) => {
      return {
        value: Object.keys(provider)[0],
        label: translate(Object.keys(provider)[0]),
      };
    });
    providers = [{ value: "", label: translate("All") }, ...providers];

    setCompanies(providers);
  }, [discounts]);
  const handleSearch = () => {
    console.log(
      'PPPP',
      transType.value,
      transStatus.value,
      provider.value
    )

    isLoading(true);
    getSellerReports(
      moment(dateFrom).format("YYYY-MM-DD"),
      moment(dateTo).format("YYYY-MM-DD"),
      phone,
      transType.value,
      transStatus.value,
      transId,
      cardId,
      cancelRequest,
      canceled,
      amount,
      renew,
      provider.value
    ).then(() => {
      isLoading(false);
    });
  };

  
  const cancelTransaction = (tranId,cnumber) => {
    isLoading(true);
    cancelTransction(tranId,cnumber).then((res) => {
        // updateTransactions();
    }).finally(() => {
        isLoading(false);
    });
}
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
            <div className="card card-home">
              <div>
                <h1 className="header-text">{translate("Report")}</h1>
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
                  <Link
                    to="profit"
                    className={`semi-nav ${
                      history === "/profit" && "active-semi"
                    } m-4`}
                  >
                    {translate("profit_calculation")}
                  </Link>
                </label>
                <label for="inputEmail3" className="col-sm-3 col-form-label">
                  <Link
                    to="running"
                    className={`semi-nav ${
                      history === "/running" && "active-semi"
                    }`}
                  >
                    {translate("running_balance")}
                  </Link>
                </label>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-11">
                <div className="row">
                  <div className="col-4">
                    <div className="report-filter-item">
                      <label className="report-label">
                        {translate("from")}
                      </label>
                      <div className="report-dropdown">
                        <DatePicker
                          selected={dateFrom}
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          className="form-control  report-form-control-date-picker"
                          onChange={(e) => setDateFrom(e)}
                        />
                      </div>
                    </div>
                    <div className="report-filter-item">
                      <label className="report-label">{translate("to")}</label>
                      <div className="report-dropdown report-form-control-date-picker">
                        <DatePicker
                          selected={dateTo}
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          className="form-control  report-form-control-date-picker"
                          onChange={(e) => setDateTo(e)}
                        />
                      </div>
                    </div>

                    <div className="report-filter-item">
                      <label className="report-label">{translate("No.")}</label>
                      <div>
                        <input
                          onChange={(element) => setPhone(element.target.value)}
                          className="form-control"
                        />
                        <div className="report-checkbox-container">
                          <Checkbox
                            className="report-checkbox"
                            onChange={(value) =>
                              setAutoRenew(value.target.checked)
                            }
                            color="primary"
                            id="autorenew"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                          <label for="autorenew">{translate("autorenew")}</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="report-filter-item">
                      <label className="report-label">
                        {translate("trans status")}
                      </label>
                      <div className="report-dropdown-container">
                        <Dropdown
                          className="report-dropdown"
                          options={transStatusOptions}
                          onChange={(value) => setTransStatus(value)}
                          value={transStatus}
                          key={transStatus.value}
                          placeholder={translate("All")}
                        />
                      </div>
                    </div>
                    <div className="report-filter-item">
                      <label className="report-label">
                        {translate("trans type")}
                      </label>
                      <div className="report-dropdown-container">
                        <Dropdown
                          className="report-dropdown"
                          options={options}
                          onChange={(value) => setTransType(value)}
                          value={transType}
                          key={transType.value}
                          placeholder={translate("All")}
                        />
                      </div>
                    </div>
                    <div className="report-filter-item">
                      <label className="report-label">
                        {translate("Provider")}
                      </label>
                      <div className="report-dropdown-container">
                        <Dropdown
                          className="report-dropdown"
                          options={companies}
                          value={provider}
                          key={provider.value}
                          onChange={(value) => setProvider(value)}
                          placeholder={translate("All")}
                        />
                        <div className="report-checkbox-container">
                          <Checkbox
                            className="report-checkbox"
                            onChange={(value) =>
                              setCanceled(value.target.checked)
                            }
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            id="canceled"
                          />
                          <label for="canceled">{translate("canceled")}</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="report-filter-item">
                      <label className="report-label">
                        {translate("movmentNo")}
                      </label>
                      <div className="report-input">
                        <input
                          onChange={(element) =>
                            setTransId(element.target.value)
                          }
                          className="form-control report-form-control"
                        />
                      </div>
                    </div>

                    <div className="report-filter-item">
                      <label className="report-label">
                        {translate("amount")}
                      </label>
                      <div className="report-input">
                        <input
                          onChange={(element) =>
                            setAmount(element.target.value)
                          }
                          className="form-control report-form-control"
                        />
                      </div>
                    </div>
                    <div className="report-filter-item">
                      <label className="report-label">
                        {translate("card_id")}
                      </label>
                      <div className="report-input">
                        <input
                          onChange={(element) =>
                            setCardId(element.target.value)
                          }
                          className="form-control report-form-control"
                        />
                        <div className="report-checkbox-container">
                          <Checkbox
                            className="report-checkbox"
                            onChange={(value) =>
                              setCancelRequests(value.target.checked)
                            }
                            color="primary"
                            id="cancel-request"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                          <label for="cancel-request">{translate("cancel request")}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1">
                <button
                  className="btn sign-but report-search-btn"
                  onClick={() => handleSearch(phone)}
                >
                  {translate("search")}
                </button>
              </div>
            </div>

            <div className="mt-3">
              <table className="table table-striped">
                <thead>
                  <tr style={{ backgroundColor: "#eff0f1" }}>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("movmentNo")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("Time")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("Provider")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("Mobile No.")}
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
                      {translate("Status")}
                    </th>

                    <th scope="col text-center">{translate("action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerReports?.map((report) => {
                    return (
                      <tr
                        className={`${
                          report.status === "proccessing" && "table-active"
                        } ${report.status === "success" && "table-green"} ${
                          report.status === "failed" && "table-danger"
                        }`}
                      >
                        <td scope="row" style={{ fontWeight: 300 }}>
                          {report.transid}
                        </td>
                        <td className="text-center" style={{ fontWeight: 300 }}>
                          {moment(report.datetime).format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td className="text-center" style={{ fontWeight: 300 }}>
                          {report.provider}
                        </td>
                        <td className="text-center" style={{ fontWeight: 300 }}>
                          {report.number}
                        </td>
                        <td className="text-center" style={{ fontWeight: 300 }}>
                          {report.cardamount}
                        </td>
                        <td className="text-center" style={{ fontWeight: 300 }}>
                          {report.status}
                        </td>
                        <td>
                            {report.status == "success" && !report.cancelrequest && (
                                <Button
                                    size="sm" 
                                    onClick={() => cancelTransaction(report.transid, report.number)}
                                    disabled={loading}
                                >
                                      {translate("Cancel")}
                                        </Button>
                                    )}
                        </td>
                        {/* <td className="text-center" style={{ fontWeight: 300 }}>
                          @mdo
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {!sellerReports?.length && (
              <div className="no-data-to-show">
                {translate("No data to show")}
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerReports: state.reports.sellerReports,
  discounts: state.discounts.discounts,
});

export default connect(mapStateToProps, { getSellerReports, getDiscounts })(
  Report
);
