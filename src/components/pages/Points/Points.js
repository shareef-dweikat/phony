import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import { useIntl } from 'react-intl';
import "./style.css";
import { getSellerPoints } from "../../../actions/reportsAction";
// import DateFnsUtils from '@date-io/date-fns';
import Spinner from "../../ui/spinner/Spinner";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
const Languages = {
  "en": "english",
  "ar": "arabic",
  "il": "israel",
};

const Points = ({ insurances, getSellerPoints, sellerPoints }) => {
  const intl = useIntl()
  const [loading, isLoading] = useState(false);
  const [fromDate, setFromDate] = useState(new Date('2021-08-18'))
  const [toDate, setToDate] = useState(new Date('2021-08-18'))
  const [currentPageContent, setCurrentPageContent] = useState([]);
  const [buttons, setButtons] = useState([]);

  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 card-md");
  useEffect(() => {
    document.title = "Seller Points | PhonePlay ";
    // if (Array.isArray(insurances) && isEmpty(insurances)) {
      // initSellerPoints();
//    }
      getPageContent(1)
      getPagesNumbers()
    refreshColumnStyle();
  }, [sellerPoints]);

  const initSellerPoints = () => {
    isLoading(true);
    const FROM_DATE = `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDay() + 1}`
    const TO_DATE = `${toDate.getFullYear()}-${toDate.getMonth() + 1}-${toDate.getDay() + 1}`

    getSellerPoints(Languages[intl.locale], FROM_DATE, TO_DATE)
    .then((res) => {
        isLoading(false)
    })
  }
  const getPageContent = (pageNumber)=> {
    const temp = sellerPoints?[...sellerPoints]:[]
    let currentContent = temp?.splice(pageNumber * 10 - 10, pageNumber * 10 - 1)
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
  console.log(sellerPoints, "ddddd")
  return (
    <div>
      <div className="container insurance style1">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
            <div>
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

               <div style={{display: 'flex', flexDirection: 'row',marginBottom: 16}}>
               {translate('from')}:
               <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  value={fromDate}
                  onChange={(date)=>setFromDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />

                 <div style={{width: 16}}/>
                  {translate('to')}:
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    // label="Date picker inline"
                    value={toDate}
                    onChange={(date)=>setToDate(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                />
                  <button style={{marginRight: 16}} onClick={initSellerPoints}>{translate('search')}</button>
              </div> 
              </MuiPickersUtilsProvider> */}

              <div className="row mb-5">
              <table>
                  <tr>
                    <th>{translate('transatction')}</th>
                    <th>{translate('date')}</th>
                    <th>{translate('seller')}</th>
                    <th>{translate('points')}</th>
                    <th>{translate('running_balance')}</th>
                  </tr>
                    {
                      currentPageContent?.map((item)=>{
                        return (  <tr>
                          <td>{item.trand_id}</td>
                          <td>{item.date}</td>
                          <td>{item.seller}</td>
                          <td>{item.points}</td>
                          <td>{item.total_points}</td>
                          </tr>
                        )
                      })
                    }
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{translate('the_sum')} {total?.toFixed(4)}</td>
                      <td></td>
                </table>
                {buttons?.map((page, index)=>
                   <button onClick={()=>getPageContent(index + 1)} id="page-number">{index + 1}</button>
                  )}
                <div>
                 {/* {sellerPoints[0].sellerPoints} مجموع النقاط */}
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

