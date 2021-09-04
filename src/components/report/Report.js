import { useState, useEffect } from "react";
import SideBar from "../homePage/SideBar";
import { Link, useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import {getSellerReports} from '../../actions/reportsAction'
import "./report.css";
import { connect } from "react-redux";
import moment from 'moment'
import Dropdown from 'react-dropdown';
import Spinner from "../ui/spinner/Spinner";

const Report = ({sellerReports, getSellerReports}) => {
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
  };
  const handleSearch = () => {
    isLoading(true);
      console.log(phone, "phooooo")
    getSellerReports(dateForm.from, dateForm.to, phone, transType, transStatus).then(()=>{
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
                    <button onClick={()=>handleSearch(phone)} className="btn sign-but">
                      {translate("search")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="form-group row">
                <label className="col-sm-1 col-form-label">
                  {translate("number")}
                </label>
                <div className="col-sm-4">
                  <input onChange={(element)=>setPhone(element.target.value)} type="number" className="form-control" />
                </div>
                <label className="col-sm-1 col-form-label">
                  {translate("trans type")}
                </label>
                <div className="col-sm-4">
                <Dropdown 
                   options={options}
                   onChange={(value)=>setTransType(value)}
                  value={defaultOption} 
                  placeholder="Select an option"
                   />
                </div>
              </div>
              
            </div>
            <div className="row mt-1">
              <div className="form-group row">
                <label className="col-sm-1 col-form-label">
                  {translate("trans status")}
                </label>
                <div className="col-sm-4">
                <Dropdown 
                   options={transStatusOptions}
                   onChange={(value)=>setTransStatus(value)}
                  value={defaultTransStatusOptions} 
                  placeholder="Select an option"
                   />
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
                      {translate("status")}
                    </th>
                    <th scope="col text-center">
                      <i
                        className="fa fa-arrow-down m-1"
                        aria-hidden="true"
                      ></i>
                      {translate("Time & Date")}
                    </th>
                    <th scope="col text-center">{translate("restoration")}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sellerReports?.map((report)=> {
                      return <tr>
                      <th scope="row">1</th>
                      <td className="text-center">{report.number}</td>
                      <td className="text-center">{report.cardamount}</td>
                      <td className="text-center">{report.status}</td>
                      <td className="text-center">{moment(report.datetime).format('YYYY-MM-DD HH:mm')}</td>
                      <td className="text-center">@mdo</td>
                    </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
            {!sellerReports?.length && <div className="no-data-to-show">{translate('No data to show')}</div>}
          </div>
        </div>
      </div>
      {loading && (<Spinner />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerReports: state.reports.sellerReports,
});

export default connect(mapStateToProps, { getSellerReports })(Report);