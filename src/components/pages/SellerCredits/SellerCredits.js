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
          <div className="card card-home">
              <div>
                <h1 className="header-text">{translate("seller credits")}</h1>
              </div>
            </div>
            <div className="credits-row">
                <div id="credits-select">
                  <Select
                    // defaultValue={colourOptions[2]}
                    placeholder={translate('select_seller')}
                    options={options}
                    onChange={(e)=> handleSellerChosen(e)}
                  />
                </div>
                <div className="credits-label">{translate('seller credits')}:</div>
                <input
                    disabled
                    value={seller.balance + '₪'}
                    style={{width: 120}}
                    className="form-control credit-input"
                  />
              <div className="credits-label">{translate('addCreadit')}:</div>
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
              
              <div style={{height: 32}}/>
              <table className="table table-striped">
                <thead>
                  <tr style={{ backgroundColor: "#eff0f1" }}>
                  <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('user id')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('name')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('Mobile No.')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('Balance')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('Debt')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('city')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('country')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('comission_code')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('enabled')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('failed_login_attempts')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('last_converted_points_date')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('points')}
                    </td>
                    <td style={{ backgroundColor: "#eff0f1" }}>
                      {translate('type')}
                    </td>
                  </tr>
                </thead>
                <tbody>
                    {sellers?.map((seller)=> 
                     <tr>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.seller_id}
                       </td>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.name}
                       </td>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.mobile_number}
                       </td>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.balance} ₪
                       </td>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.debth}
                       </td>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.city}
                       </td>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.country}
                       </td>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.commission_code}
                       </td> 
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.enabled === 'true'?translate('Yes'):translate('No')}
                       </td> 
                        <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.failed_login_attempt}
                       </td> 
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.last_converted_points_date}
                       </td>
                       <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.points}
                       </td> 
                        <td className="text-center" style={{ fontWeight: 300 }}>
                        {seller.type === 'N/A'? translate('Not available'):translate(seller.type)}
                       </td> 
                     </tr>
                    )} 
                </tbody>
              </table>
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

