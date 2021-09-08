import { useState, useEffect } from "react";
import SideBar from "../homePage/SideBar";
import { Link, useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import {getSellerCancelationReports} from '../../actions/reportsAction'
import "./report.css";
import { connect } from "react-redux";
import moment from 'moment'
import Dropdown from 'react-dropdown';
import Spinner from "../ui/spinner/Spinner";
import DatePicker from "react-datepicker";

const Cancelation  = ({sellerCancelationReports, getSellerCancelationReports}) => {
  const history = useHistory().location.pathname;
  const options = [
    'All','topup', 'cancelation', 'add credits'
  ];
  const defaultOption = '';
  const transStatusOptions = [
    'All','success', 'failed', 'pending'
  ];
  const defaultTransStatusOptions = '';

 
  console.log(sellerCancelationReports, 'sellerCancelationReportsss')
  const [phone, setPhone] = useState('');
  const [transType, setTransType] = useState('All');
  const [transStatus, setTransStatus] = useState('All');
  const [loading, isLoading] = useState(false);

  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());
  useEffect(() => {
    document.title = "Report | Phone Play";
    //getSellerReports(dateForm.from, dateForm.to)
  }, []);
 
  const handleSearch = () => {
    isLoading(true);
    getSellerCancelationReports(moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'), transType.value, transStatus.value).then(()=>{
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
                  <Link className={`semi-nav ${
                      history === "/cancelation" && "active-semi"
                    }`}>
                      {translate("refund")}
                  </Link>
                </label>
                <label for="inputEmail3" className="col-sm-3 col-form-label">
                  <Link to="running" className={`semi-nav ${
                      history === "/running" && "active-semi"
                    }`}>
                    {translate("running_balance")}
                  </Link>
                </label>
              </div>
            </div>
            <div className="mt-5">
              <div className="row">
                <div className="form-group row">
                  <label className="col-sm-1 col-form-label" style={{width: 130}}>
                    {translate("from")}
                  </label>
                  <div className="col-sm-3">
                  <DatePicker
                      selected={dateFrom}
                      type="date"
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                      onChange={(e)=> setDateFrom(e)}
                  />
                 
                  </div>
                  <label className="col-sm-1 col-form-label" style={{width: 120}}>
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
                  </div>
                  <div className="col-sm-1">
                    <button onClick={()=>handleSearch(phone)} className="btn sign-but">
                      {translate("search")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="form-group row">
                <label className="col-sm-1 col-form-label"  style={{width: 130}}>
                  {translate("number")}
                </label>
                <div className="col-sm-3">
                  <input 
                  //  style={{width: 150}}
                    onChange={(element)=>setPhone(element.target.value)} 
                    className="form-control" 
                  />
                </div>
                <label className="col-sm-1 col-form-label" style={{width: 120}} >
                  {translate("trans type")}
                </label>
                <div className="col-sm-4">
                <Dropdown 
                   options={options}
                   onChange={(value)=>setTransType(value)}
                   value={defaultOption} 
                   placeholder="Select"
                />
                </div>
              </div>
              
            </div>
            <div className="row mt-1">
              <div className="form-group row">
                <label className="col-sm-1 col-form-label" style={{width: 130}}>
                  {translate("trans status")}
                </label>
                <div className="col-sm-4" style={{width: 240}}>
                <Dropdown 
                   options={transStatusOptions}
                   onChange={(value)=>setTransStatus(value)}
                    value={defaultTransStatusOptions} 
                    placeholder="Select"
                   />
                </div>
              </div>
              
            </div>
            <div className="mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
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
                      {translate("Time & Date")}
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
                  {
                    sellerCancelationReports?.map((report)=> {
                      return <tr>
                      <th scope="row">{report.transid}</th>
                      <td className="text-center">{moment(report.datetime).format('YYYY-MM-DD HH:mm')}</td>
                      <td className="text-center">{report.provider}</td>
                      <td className="text-center">{report.number}</td>
                      <td className="text-center">{report.cardamount}</td>
                      <td className="text-center">{report.status}</td>
                      <td className="text-center">@mdo</td>
                    </tr>
                    })
                  }
               
                </tbody>
              </table>
            </div>
            {!sellerCancelationReports?.length && <div className="no-data-to-show">{translate('No data to show')}</div>}
          </div>
        </div>
      </div>
      {loading && (<Spinner />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerCancelationReports: state.reports.sellerCancelationReports,
});

export default connect(mapStateToProps, { getSellerCancelationReports })(Cancelation);