import { useState, useEffect } from "react";
import SideBar from "../homePage/SideBar";
import { Link, useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import {getSellerProfit} from '../../actions/reportsAction'
import "./report.css";
import { connect } from "react-redux";
import moment from 'moment'
import Spinner from "../ui/spinner/Spinner";

const Profit = ({sellerProfit, getSellerProfit}) => {
  const history = useHistory().location.pathname;
  const options = [
    'topup', 'cancelation', 'add credits'
  ];
  const defaultOption = options[0];
  const transStatusOptions = [
    'success', 'failed', 'pending'
  ];
  const defaultTransStatusOptions = transStatusOptions[0];

  const [dateForm, setDateForm] = useState({
    from: "",
    to: "",
  });
  
  const [phone, setPhone] = useState('');
  const [transType, setTransType] = useState('topup');
  const [transStatus, setTransStatus] = useState('success');
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    document.title = "Report | Phone Play";
    //getSellerReports(dateForm.from, dateForm.to)
  }, []);
  const onChangeDate = (e) => {
    setDateForm({ ...dateForm, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const handleSearch = () => {
    isLoading(true);

    getSellerProfit(dateForm.from, dateForm.to).then(()=>{
      isLoading(false)
    })
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
                    } m-4`}
                  >
                    {translate("profit")}
                </Link>
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
                      {translate("date")}
                    </th>
                    <th scope="col text-center" style={{ width: "170px" }}>
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("number")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("profit")}
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
                      {translate("seller cost")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sellerProfit?.map((report)=> {
                      return <tr>
                      <th scope="row">{report.transidd}</th>
                      <td className="text-center">{moment(report.date).format('YYYY-MM-DD')}</td>
                      <td className="text-center">{report.number}</td>
                      <td className="text-center">{report.profit}</td>
                      <td className="text-center">{report.amount}</td>
                      <td className="text-center">{report.sellercost}</td>
                    </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
            {!sellerProfit?.length && <div className="no-data-to-show">{translate('No data to show')}</div>}
          </div>
        </div>
      </div>
      {loading && (<Spinner />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerProfit: state.reports.sellerProfit,
});

export default connect(mapStateToProps, { getSellerProfit })(Profit);