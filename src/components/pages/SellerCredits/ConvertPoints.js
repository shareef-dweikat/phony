import { useEffect, useState, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import { useIntl } from 'react-intl';
import "./style.css";
import { convertPoints, getRewards, convertPointsToCash } from "../../../actions/sellerCreditsAction";
import Spinner from "../../ui/spinner/Spinner";
import Select from 'react-select';
import Toast from "./ConfirmToast";
import { intl } from "../../../i18n/provider";
import Modal from 'react-modal';
import Dropdown from 'react-dropdown'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 400,
 
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const ConvertPoints = ({ rewards, convertPoints, getRewards, convertPointsToCash}) => {
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch()
  const [input, setInput] = useState();
  const [seller, setSeller] = useState({balance: 0});
  const [modalIsOpen, setIsOpen] =useState(false);
  const [isCashModal, setIsCashModal] =useState(false);
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [amount, setAmount] = useState(0)

  
  const banks = [
    { value: translate("islamicPalestineBank"), label: translate("islamicPalestineBank") },
    { value: translate("islamicArabicBank"), label: translate("islamicArabicBank") },
    { value: translate("arabBank"), label: translate("arabBank") },
    { value: translate("egybtBank"), label: translate("egybtBank") },
    { value: translate("nationalBank"), label: translate("nationalBank") },
    { value: translate("housingBank"), label: translate("housingBank") },
    { value: translate("jerusalembank"), label: translate("jerusalembank") },
    { value: translate("ciroAmmanBank"), label: translate("ciroAmmanBank") },
    { value: translate("jordeninAhliBank"), label: translate("jordeninAhliBank") },
    { value: translate("safaBank"), label: translate("safaBank") },
    { value: translate("bankofjordan"), label: translate("bankofjordan") },
    { value: translate("palestineInvestmentBank"), label: translate("palestineInvestmentBank") },
    { value: translate("bankOfPalestine"), label: translate("bankOfPalestine") },
  ]
  useEffect(() => {
    document.title = "Seller Credits | PhonePlay ";
    isLoading(true);
    getRewards()
      .then((res) => {
        isLoading(false)
       
      })
  }, []);
  

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleConvertToCash = () => {
    if(bankName === '' || accountNumber ==='' || amount === '') {
      Toast.fire({
        title: intl.formatMessage({id: "All fields are required"}),
        icon: "alert",
        showConfirmButton: true,
      })
      return
    }
    isLoading(true);
    convertPointsToCash(bankName, accountNumber, amount).then(() => {
      setIsCashModal(false)
      setAccountNumber('')
      setAmount(0)
      setBankName('')
      isLoading(false)
    })
  }
  const handleRewardClicked = (id,price, type)=>{
    if(type === 'balance') {
      return
    }
    if(type === 'cash') {
      setIsCashModal(true)
      return
    }
    if(parseFloat(currentUser.points) < parseFloat(price)) {
      Toast.fire({
        title: intl.formatMessage({id: "insufficient points"}),
        icon: "alert",
        showConfirmButton: true,
      })
    } else 
    Toast.fire({
      title: intl.formatMessage({id: "Are you sure?"}),
      icon: "alert",
      reward_id: id,
      showConfirmButton: true,
      confirmButtonText: intl.formatMessage({id: "Confirm"})
    }).then((results)=> {
      if(results.isConfirmed)
      convertPoints(id)
    })
   //convertPoints(id)
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser, "currentuser")
  return (
    <div>
      <div className="container insurance style1">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
            <div>
                <h1 className="header-text">{translate("Convert points")}</h1>
              </div>
            </div>
            <div style={{marginTop: 16}}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>
                {translate('user id')}: 
                {currentUser.sellerid}
              </span>
              <span>
                 {translate('theseller')}: 
                {currentUser.name}
              </span>
              <span>
                 {translate('balance')}: 
                {currentUser.balance}
              </span>
              <span>
                 {translate('remaining_days')}: 
                {currentUser.days_remaining}
              </span>
              
            </div>
            {/* <Toolbar title={currentUser?.days_remaining + ' Days'}>
                { currentUser?.locked?
                  <i class="fas fa-lock"  style={{fontSize: 25}}></i>
                  : <i class="fas fa-lock-open" style={{fontSize: 25}}></i>
                }
              </Toolbar> */}
              <div style={{marginTop: 16}}/>
            <div className="row">
              {rewards?.map((reward)=>
                <div className={
                  parseFloat(currentUser.points) < parseFloat(reward.price)?'convert-points-card grayed-out': 'convert-points-card'}
                >
                <img 
                    src={`http://${reward.url}`}
                    style={{cursor: 'pointer', height: 150}}
                    onClick={()=>handleRewardClicked(reward.id, reward.price, reward.type)}
                />
                  <div style={{fontSize: 12, textAlign: 'center', marginTop: 8}}>{reward.name}</div>
                  <div style={{fontSize: 12, textAlign: 'center', direction: 'ltr'}}>
                  {reward.price + ' ' +intl.formatMessage({id: 'Points'})}
                  </div>
                </div>
              )}
            </div>
           </div>
            {loading && (<Spinner />)}
          </div>
        </div>
      <Modal
        // isOpen={modalIsOpen}
        isOpen={isCashModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={()=>setIsCashModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{display: 'flex'}}>
          <div className="convert-points-input">
              <Dropdown
                // className="report-dropdown"
                  options={banks}
                 onChange={(e) => setBankName(intl.formatMessage({id: e.value.props.id}))}
                // value={transStatus}
                //key={transStatus.value}
                placeholder={intl.formatMessage({id: "Select a bank"})}
                />
          </div>
          <input
                onChange={(element) => setAccountNumber(element.target.value)}
                className="form-control convert-points-input"
                placeholder={intl.formatMessage({id: "Enter account number"})}
          />
          <input
                onChange={(element) => setAmount(element.target.value)}
                className="form-control convert-points-input"
                placeholder={intl.formatMessage({id: "Enter the amount"})}
          />
          <div style={{width: 16}}/>
          <button
           onClick={handleConvertToCash}
            className="btn sign-but"
          >
            {translate('submit')}
          </button>
        </div>
      </Modal>
      </div>
  );
};

const mapStateToProps = (state) => ({
  rewards: state.credits.rewards,
  // sellers:state.credits.sellers,
});

export default connect(mapStateToProps, { convertPoints, getRewards, convertPointsToCash })(ConvertPoints);

