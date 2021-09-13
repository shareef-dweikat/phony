import { useState, useEffect } from "react";
import SideBar from "../homePage/SideBar";
import { Link, useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import {getSellerRunningReports} from '../../actions/reportsAction'
import "./report.css";
import { connect } from "react-redux";
import moment from 'moment'
import Spinner from "../ui/spinner/Spinner";
import DatePicker from "react-datepicker";

const RuningBalance = ({sellerRunning, getSellerRunningReports}) => {
  const history = useHistory().location.pathname;

 
  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());

  const [loading, isLoading] = useState(false);

  useEffect(() => {
    document.title = "Report | Phone Play";
  }, []);
 
  const handleSearch = () => {
    isLoading(true);
    getSellerRunningReports(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD')).then(()=>{
      isLoading(false)
    })
  }
  let totalValue = 0
  let totalSellerCost = 0
  sellerRunning?.map((sellerProfit)=>{
    totalValue = totalValue + sellerProfit.cardamount
    totalSellerCost = totalSellerCost + sellerProfit.dealercost

  })
  console.log(sellerRunning, "sellerRunning")
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
                    to="report"
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
                    } m-0`}
                  >
                    {translate("profit_calculation")}
                </Link>
                </label>
                {/* <label for="inputEmail3" className="col-sm-2 col-form-label">
                  <Link to="cancelation"  className="semi-nav">{translate("refund")}</Link>
                </label> */}
                <label for="inputEmail3" className="col-sm-3 col-form-label">
                  <Link  className={`semi-nav ${
                      history === "/running" && "active-semi"
                    }`}>
                    {translate("running_balance")}
                  </Link>
                </label>
              </div>
            </div>
            <div className="mt-2">
              <div className="row">
                <div className="form-group row">
                  <label className="col-sm-1 col-form-label">
                    {translate("from")}
                  </label>
                  <div className="col-sm-4">
                  <DatePicker
                      selected={dateFrom}
                      type="date"
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                      onChange={(e)=> setDateFrom(e)}
                  />
                    {/* <input
                      name="from"
                      value={dateForm.from}
                      type="date"
                      className="form-control"
                      onChange={(e) => onChangeDate(e)}
                    /> */}
                  </div>
                  <label className="col-sm-1 col-form-label">
                    {translate("to")}
                  </label>
                  <div className="col-sm-4">
                  <DatePicker
                       selected={dateTo}
                      type="date"
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                      onChange={(e)=> setDateTo(e)}
                    />
                    {/* <input
                      name="to"
                      value={dateForm.to}
                      type="date"
                      className="form-control"
                      onChange={(e) => onChangeDate(e)}
                    /> */}
                  </div>
                  <div className="col-sm-2">
                    <button onClick={()=>handleSearch()} className="btn sign-but">
                      {translate("search")}
                    </button>
                  </div>
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
                      {translate("movmentNo")}
                    </th>
                    <th scope="col text-center" style={{ width: "170px", textTransform: 'capitalize' }}>
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("Time")}
                    </th>
                    <th scope="col text-center" style={{ width: "170px" }}>
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("number")}
                    </th>
                    {/* <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("profit")}
                    </th> */}
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
                      {translate("seller cost")}
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
                      {translate("seller balance")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sellerRunning?.map((report)=> {
                      return <tr>
                      <th scope="row">{report.transid}</th>
                      <td className="text-center">{moment(report.date).format('YYYY-MM-DD')}</td>
                      <td className="text-center">{report.number}</td>
                      {/* <td className="text-center">{report.profit}</td> */}
                      <td className="text-center">{report.cardamount}</td>
                      <td className="text-center">{report.dealercost}</td>
                      <td className="text-center">{report.status}</td>
                      <td className="text-center">{report.newsellerbalance}</td>
                    </tr>
                    })
                  }
                     <tr>
                       <td></td>
                       <td></td>
                      <td>{translate('The_Summation')}</td>
                      {/* <td>{totalProfit}</td> */}
                      <td>{totalValue.toFixed(2)}</td>
                      <td>{totalSellerCost?.toFixed(2)}</td>
                    </tr>
                </tbody>
              </table>
            </div>
            {!sellerRunning?.length && <div className="no-data-to-show">{translate('No data to show')}</div>}
          </div>
        </div>
      </div>
      {loading && (<Spinner />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerRunning: state.reports.sellerRunning,
});

export default connect(mapStateToProps, { getSellerRunningReports })(RuningBalance);