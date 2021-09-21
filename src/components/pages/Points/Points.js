import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import { useIntl } from 'react-intl';
import "./style.css";
import { getSellerPoints } from "../../../actions/reportsAction";
import Spinner from "../../ui/spinner/Spinner";
import moment from 'moment'
import DatePicker from "react-datepicker";
const Languages = {
  "en": "english",
  "ar": "arabic",
  "il": "israel",
};

const Points = ({ insurances, getSellerPoints, sellerPoints }) => {
  const intl = useIntl()
  const [loading, isLoading] = useState(false);
  const [dateForm, setDateForm] = useState({
    from: moment().format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD'),
  });
  const [currentPageContent, setCurrentPageContent] = useState([]);
  const [buttons, setButtons] = useState([]);

  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());

  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 card-md");
  useEffect(() => {
    document.title = "Seller Points | PhonePlay ";

      getPageContent(1)
      getPagesNumbers()
    refreshColumnStyle();
  }, [sellerPoints]);
 
  const initSellerPoints = () => {
    isLoading(true);
    getSellerPoints(Languages[intl.locale], moment(dateFrom).format('YYYY-MM-DD'), moment(dateTo).format('YYYY-MM-DD'))
    .then((res) => {
        isLoading(false)
    })
  }
  const getPageContent = (pageNumber)=> {
    const temp = sellerPoints?[...sellerPoints]:[]
    let currentContent = temp?.slice(pageNumber * 10 - 10, pageNumber * 10 - 1)
    setCurrentPageContent(currentContent)
  }
  const getPagesNumbers = (sellerPointss)=> {
    let pagesCount = Math.ceil(sellerPoints?.length / 10);

      let buttons = []
      for(let i = 1; i <= pagesCount ;i++){
          buttons.push({index: i})
      }
      setButtons(buttons)
  }
  const refreshColumnStyle = () => {
    switch(localStorage.size) {
      case "default":
      case "column4":
        setColumnStyle("col-lg-3 col-md-4 col-sm-6 card-md");
        break;
      case "column3":
        setColumnStyle("col-lg-4 col-md-6 col-sm-6 card-lg");
        break;
      case "column6":
        setColumnStyle("col-lg-2 col-md-4 col-sm-6 card-sm");
        break;
    }
  }
  let total = 0
  currentPageContent?.map((item)=> {
    total = total + parseFloat(item.points)
  })
  return (
    <div className="points-page">
      <div className="container insurance style1">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
            <div className="card card-home">
                <h1 className="header-text">{translate("Points report")}</h1>
            </div>
            <div>
            <div className="mt-5">
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
                  </div>
                  <div className="col-sm-2">
                    <button onClick={initSellerPoints} className="btn sign-but">
                      {translate("search")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
         
              <div style={{marginTop: 16}} />
              <div className="row mb-5 mt-10">
              <table>
                  <tr>
                    <th>{translate('movmentNo')}</th>
                    <th>{translate('date')}</th>
                    <th>{translate('theseller')}</th>
                    <th>{translate('points')}</th>
                    <th>{translate('running_balance')}</th>
                    <th>{translate('The type')}</th>
                  </tr>
                    {
                      currentPageContent?.map((item)=>{
                        return (  <tr>
                          <td>{item.trand_id}</td>
                          <td>{item.date}</td>
                          <td>{item.seller}</td>
                          <td>{item.points}</td>
                          <td>{item.total_points}</td>
                          <td>{translate(item?.type)}</td>
                          </tr>
                        )
                      })
                    }
                      <td></td>
                      <td></td>
                      <td>{translate('the_sum')}</td>
                      <td>{total?.toFixed(4)}</td>
                      <td></td>
                </table>
                {buttons?.map((page, index)=>
                   <button onClick={()=>getPageContent(index + 1)} id="page-number">{index + 1}</button>
                  )}
                <div>
                </div>
              </div>
            </div>
            {loading && (<Spinner />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerPoints: state.reports.sellerPoints,
});

export default connect(mapStateToProps, { getSellerPoints })(Points);

