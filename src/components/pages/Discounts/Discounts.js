import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import { useIntl } from 'react-intl';
import "./style.css";
import { getDiscounts } from "../../../actions/discountsAction";
import Spinner from "../../ui/spinner/Spinner";

const Languages = {
  "en": "english",
  "ar": "arabic",
  "il": "israel",
};

const Discounts = ({ discounts, getDiscounts}) => {
  const [loading, isLoading] = useState(false);
  
  const [currentPageContent, setCurrentPageContent] = useState([]);
  const [buttons, setButtons] = useState([]);

  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 card-md");
  useEffect(() => {
    document.title = "Seller Points | PhonePlay ";
    isLoading(true);
    getDiscounts()
      .then((res) => {
        isLoading(false)
       
      })
      refreshColumnStyle();
  }, []);
  
  useEffect(()=>{
    getPageContent(1)
       getPagesNumbers()
  
  },[discounts])
  const getPageContent = (pageNumber)=> {

    const temp = discounts.length > 0?[...discounts]:[]
    let currentContent = temp?.splice(pageNumber * 10 - 10, pageNumber * 10 - 1)
    setCurrentPageContent([...currentContent])
  }
  const getPagesNumbers = ()=> {
    let pagesCount = Math.ceil(discounts?.length / 10);

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
 console.log(currentPageContent, "currentPageContent")
  return (
    <div className="discounts-page">
      <div className="container insurance style1">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
            <div>
              <div style={{marginTop: 16}} />
              <div className="row mb-5 mt-10">
              <table>
                  <tr>
                    <th>{translate('Provider')}</th>
                    <th>{translate('discount')}</th>            
                  </tr>
                    {
                      currentPageContent?.map((item)=>{
                        var keys = Object.keys( item )
                        if(!item[keys[1]]) {
                          return null
                        }
                        return (
                          <tr>
                              <td>{keys[0]}</td>
                              <td>{item[keys[1]]}</td>
                          </tr>
                        )
                      })
                    }
                </table>
                {currentPageContent.length == 0 && <div style={{marginRight: 32, paddingTop: 32}}>{translate('No data to show')}</div>}
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
  discounts: state.discounts.discounts,
});

export default connect(mapStateToProps, { getDiscounts })(Discounts);

