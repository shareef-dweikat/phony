import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import { getLastTransaction, showTransctionDetails, cancelTransction } from "../../actions/reportsAction";
import moment from "moment";
import Spinner from "../ui/spinner/Spinner";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Toast from "./Toast";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
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
                            <th scope="col ">{translate("transactionNo")}</th>
                            <th scope="col">{translate("Date & Time")}</th>
                            <th scope="col">{translate("Mobile No.")}</th>
                            <th scope="col">{translate("Provider")}</th>
                            <th scope="col">{translate("Amount")}</th>
                            <th scope="col">{translate("seller cost")}</th>
                            <th scope="col">{translate("Status")}</th>
                            <th scope="col">{translate("Actions")}</th>
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
                                 {item.status === 'success'?
                                        <td style={{display: 'flex', flexDirection: 'row'}}>
                                            <div onClick={()=> setIsDetailsButtonClicked({flag: !isDetailsButtonClicked.flag, index: index})} >
                                                <img style={{display: 'inline'}} src={DownArrow} width={25} height={25}/>
                                            </div>
                                            <span style={{ marginLeft: 8, marginRight: 8, fontWeight: 600}}>
                                              {item.transid}
                                            </span>
                                        </td> 
                                        :
                                        <td scope="row ">
                                            {item.transid}
                                        </td>
                                    }
                                <td>{moment(item.datetime).format("YYYY-MM-DD / HH:mm:ss")}</td>
                                <td>{item.number}</td>
                                <td className="table-dadnger">{item.provider}</td>
                                <td>₪ {item.cardamount || 0}</td>
                                <td>{item.dealercost === 'N/A'?'':'₪'} {item.dealercost || 0}</td>
                                <td>{item.status?translate(item?.status):''}</td>
                                <td>
                                    {item.status == "failed" && (
                                        <Button size="sm" 
                                        // onClick={() => showReason(item.transid)} 
                                        onClick={()=> setIsDetailsButtonClicked({flag: !isDetailsButtonClicked.flag, index: index})}
                                        disabled={loading}>
                                            {translate("Details")}
                                        </Button>
                                    )}
                                    {item.status == "success" && !item.cancelrequest && (
                                        <Button size="sm" onClick={() => cancelTransaction(item.transid, item.number)} disabled={loading}>
                                            {translate("Cancel")}
                                        </Button>
                                    )}
                                </td>
                            </tr>
                            {
                               isDetailsButtonClicked.flag && isDetailsButtonClicked.index === index && (
                                    <tr style={{backgroundColor: 'white'}}>
                                        <td colspan="7" style={{textAlign: 'right'}}>
                                            <div>{item.carddescription}</div>
                                            <div>{translate('Renewable')}: {item.autorenew?'نعم':'لا'}</div>
                                            <div>{translate('Provider')}: {item.provider}</div>
                                            <div>{translate('trans type')}: {item.transtype}</div>
                                            {item.status !== 'success' && <div>{translate('Reason')}: {item.reason}</div>}
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
  