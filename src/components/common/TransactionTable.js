import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import { getLastTransaction, showTransctionDetails, cancelTransction } from "../../actions/reportsAction";
import moment from "moment";
import Spinner from "../ui/spinner/Spinner";
import { connect } from "react-redux";
import refund from '../../assests/images/icons/cancel.png'

import Toast from "./Toast";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Img from '../../assests/images/bundles/jawwal/jawwal-20.png'
import DownArrow from '../../assests/images/icons/down-circular-button.png'
const TransactionTable = ({ getLastTransaction, last }) => {
    const history = useHistory();
    const [loading, isLoading] = useState(false);
    const intl = useIntl();
    const url = new URLSearchParams(history.location.search)
    const [isDetailsButtonClicked, setIsDetailsButtonClicked] = useState({flag: false, index: null})
    useEffect(() => {
        updateTransactions();
        if (url.get("refresh") == "true") {
            setTimeout(() => {
                updateTransactions();
            }, 10000);
        }
    }, []);

    const updateTransactions = () => {
        isLoading(true);
        getLastTransaction()
        .finally(() => {
          isLoading(false);
        })
    };

    const showReason = (tranId) => {
        isLoading(true);
        showTransctionDetails(tranId, intl.locale)
        .then((res) => {
            isLoading(false);
            Toast.fire({
                title: res,
                text: "",
                icon: "info",
                button: intl.formatMessage({ id:"OK" }),
            });
        });
    }

    const cancelTransaction = (tranId,cnumber) => {
        isLoading(true);
        cancelTransction(tranId,cnumber).then((res) => {
            updateTransactions();
        }).finally(() => {
            isLoading(false);
        });
    }
    return (
        <div className="transactions">
            <div className="mt-5 d-flex flex-row-reverse">
                <button className="btn rom-selected" onClick={updateTransactions} disabled={loading}>
                    {translate("Update")}
                </button>
            </div>
            <div className="my-3 position-relative">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col ">{translate("serial.no")}</th>
                            <th scope="col">{translate("date")}</th>
                            <th scope="col">{translate("Mobile No.")}</th>
                            <th scope="col">{translate("Provider")}</th>
                            <th scope="col">{translate("Amount")}</th>
                            <th scope="col">{translate("seller cost")}</th>
                            <th scope="col">{translate("Status")}</th>
                            <th scope="col">{translate("Action")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {last.map((item, index) => (
                            <>
                            <tr
                            className={`${item.status === "proccessing" && "table-active"} ${
                                item.status === "success" && "table-green"
                            } ${item.status === "failed" && "table-danger"}  ${item.cancelrequest && "table-canceled"}`}
                            >
                               <div onClick={()=> setIsDetailsButtonClicked({flag: !isDetailsButtonClicked.flag, index: index})} >
                                   <img style={{display: 'inline', cursor: 'pointer'}}  src={DownArrow} width={25} height={25}/>
                                </div>
                                <td scope="row ">
                                    {item.transid}
                                </td>
                                <td>{moment(item.datetime).format("YYYY-MM-DD / HH:mm:ss")}</td>
                                <td>{item.number}</td>
                                <td className="table-dadnger">{item.provider}</td>
                                <td>₪ {item.cardamount || 0}</td>
                                <td>{item.dealercost === 'N/A'?'':'₪'} {item.dealercost || 0}</td>
                                <td>{item.status?translate(item?.status):''}</td>
                                <td>
                                    {item.status == "success" && !item.cancelrequest && item.type !='topup' &&(
                                        <img  
                                            onClick={() => cancelTransaction(item.transid, item.number)}
                                            style={{width: 25, cursor: 'pointer'}}
                                            src={refund} 
                                        /> 
                                    )}
                                </td>
                            </tr>
                            {
                               isDetailsButtonClicked.flag && isDetailsButtonClicked.index === index && (
                                    <tr style={{backgroundColor: 'white'}}>
                                        <td colspan="8" style={{textAlign: 'right'}}>
                                            <div>
                                                <div>{item.carddescription}</div>
                                                <div>{translate('Renewable')}: {item.autorenew?translate('Yes'):translate('No')}</div>
                                                {/* <div>{translate('Provider')}: {translate(item.provider)}</div> */}
                                                <div>{translate('trans type')}: {translate(item.transtype)}</div>
                                                {item.status !== 'success' && <div>{translate('Reason')}: {item.reason}</div>}
                                            </div>
                                        </td>
                                        <td>
                                            <img 
                                            src={
                                                item.url === "N/A"? 
                                                require(`../../assests/images/bundles/${item.provider}/${item.provider}-${item.cardamount}.png`).default:item.url} 
                                                style={{width: 150}}
                                            />
                                        </td>
                                    </tr>
                                )
                            
                            }
                            </>
                        ))}
                    </tbody>
                </table>
                {loading && (<Spinner type="inner"/>)}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    last: state.reports.lastTransaction,
});
export default connect(mapStateToProps, { getLastTransaction })(TransactionTable);
  