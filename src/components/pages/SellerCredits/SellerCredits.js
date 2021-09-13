import { useEffect, useState, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import { useIntl } from 'react-intl';
import "./style.css";
import { addSellerCredit, getSellerBalance } from "../../../actions/sellerCreditsAction";
import Spinner from "../../ui/spinner/Spinner";
import Select from 'react-select';


const SellerCredits = ({ credits, addSellerCredit}) => {
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch()
    console.log(credits, 'creditsssss')
  const [input, setInput] = useState();

  useEffect(() => {
    document.title = "Seller Credits | PhonePlay ";
    // isLoading(true);
    // getDiscounts()
    //   .then((res) => {
    //     isLoading(false)
       
    //   })
  }, []);
  
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const handleInputChanged = (value) => {
    if(value <= 0){
      setInput(0)
      return
    }
    setInput(value)
  }

  const handleAddCredit = () => {
    addSellerCredit(input)
  }

  const handleSellerChosen = (seller) => {
    const sellerId = seller
    getSellerBalance(sellerId)
  }
  return (
    <div className="discounts-page">
      <div className="container insurance style1">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
            

          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
              
              <div className="credits-row">
                <div id="credits-select">
                  <Select
                    // defaultValue={colourOptions[2]}
                    placeholder="اختر تاجراً"
                    options={options}
                    onChange={(e)=> handleSellerChosen(e.value)}
                  />
                </div>
                <div>رصيد التاجر:</div>
                <input
                    disabled
                    value={100 + '₪'}
                    style={{width: 80}}
                    className="form-control credit-input"
                  />
                <input
                    onChange={(e)=>handleInputChanged(e.target.value)}
                    type='number'
                    value={input}
                    placeholder="ادخل الرصيد الجديد"
                    className="form-control credit-input"
                  />
                  <button
                    className="btn sign-but credits-btn"
                    onClick={handleAddCredit}
                   >
                  {translate("submit")}
                </button>
              </div>
          </div>
            {loading && (<Spinner />)}
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  credits: state.credits.credits,
});

export default connect(mapStateToProps, { addSellerCredit })(SellerCredits);

