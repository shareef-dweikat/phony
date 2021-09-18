import { useEffect, useState, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import { useIntl } from 'react-intl';
import "./style.css";
import { convertPoints, getRewards } from "../../../actions/sellerCreditsAction";
import Spinner from "../../ui/spinner/Spinner";
import Select from 'react-select';
import Toast from "./ConfirmToast";
import { intl } from "../../../i18n/provider";
import Swal from "sweetalert2";



const ConvertPoints = ({ rewards, convertPoints, getRewards}) => {
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch()
  const [input, setInput] = useState();
  const [seller, setSeller] = useState({balance: 0});
 
  useEffect(() => {
    document.title = "Seller Credits | PhonePlay ";
    isLoading(true);
    getRewards()
      .then((res) => {
        isLoading(false)
       
      })
  }, []);
  
  const handleRewardClicked = (id)=>{
    Toast.fire({
      title: intl.formatMessage({id: "The minimum credit is 10 NIS"}),
      icon: "alert",
      reward_id: id,
      showConfirmButton: true,
      confirmButtonText: intl.formatMessage({id: "Confirm"})
    }).then(()=> {
      convertPoints(id)
    })
   //convertPoints(id)
  }
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
            <div className="row">
              {rewards?.map((reward)=>
                <div style={{width: 100}}>
                  <img 
                    src={`http://${reward.url}`}
                    style={{width: 100, cursor: 'pointer'}}
                    onClick={()=>handleRewardClicked(reward.id)}
                  />
                  <span style={{fontSize: 12}}>{reward.name}</span>
                  <span style={{fontSize: 12}}>{reward.price}</span>
                </div>
              )}
            </div>
           </div>
            {loading && (<Spinner />)}
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  rewards: state.credits.rewards,
  // sellers:state.credits.sellers,
});

export default connect(mapStateToProps, { convertPoints, getRewards })(ConvertPoints);

