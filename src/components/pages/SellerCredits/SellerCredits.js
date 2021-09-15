import { useEffect, useState, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import { useIntl } from 'react-intl';
import "./style.css";
import { addSellerCredit, getSellerBalance, getSellers } from "../../../actions/sellerCreditsAction";
import Spinner from "../../ui/spinner/Spinner";
import Select from 'react-select';


const SellerCredits = ({ credits, sellers, addSellerCredit, getSellers}) => {
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch()
  const [input, setInput] = useState();
  const [seller, setSeller] = useState({balance: 0});

  useEffect(() => {
    document.title = "Seller Credits | PhonePlay ";
    isLoading(true);
    getSellers()
      .then((res) => {
        isLoading(false)
       
      })
  }, []);
  
  const options = sellers?.map((item)=>{
    return  { value: item.seller_id, label: item.name + " " +item.seller_id, balance: item.balance }
  })
    
  
  const handleInputChanged = (value) => {
    if(value <= 0){
      setInput(0)
      return
    }
    setInput(value)
  }

  const handleAddCredit = () => {
    addSellerCredit(input, seller.value)
  }

  const handleSellerChosen = (seller) => {
    setSeller(seller)
   // getSellerBalance(sellerId)
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
                    placeholder={translate('select_seller')}
                    options={options}
                    onChange={(e)=> handleSellerChosen(e)}
                  />
                </div>
                <div>{translate('seller credits')}:</div>
                <input
                    disabled
                    value={seller.balance + '₪'}
                    style={{width: 90}}
                    className="form-control credit-input"
                  />
              <div>{translate('addCreadit')}:</div>
                <input
                    onChange={(e)=>handleInputChanged(e.target.value)}
                    type='number'
                    value={input}
                    // placeholder={translate('addCreadit')}
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
  sellers:state.credits.sellers,
});

export default connect(mapStateToProps, { addSellerCredit, getSellers })(SellerCredits);

