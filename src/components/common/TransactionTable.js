import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import { getLastTransaction, showTransctionDetails, cancelTransction } from "../../actions/reportsAction";
import moment from "moment";
import Spinner from "../ui/spinner/Spinner";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import Toast from "./Toast";
import { useIntl } from "react-intl";

const TransactionTable = ({ getLastTransaction, last }) => {
    const [loading, isLoading] = useState(false);
    const intl = useIntl();
    
    useEffect(() => {
        isLoading(true);
        getLastTransaction()
        .finally(() => {
            isLoading(false);
        });
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

    const cancelTransaction = (tranId) => {
        isLoading(true);
        cancelTransction(tranId).then((res) => {
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
                            <th scope="col ">{translate("Transaction")}</th>
                            <th scope="col">{translate("Provider")}</th>
                            <th scope="col">{translate("Mobile No.")}</th>
                            <th scope="col">{translate("Amount")}</th>
                            <th scope="col">{translate("Date & Time")}</th>
                            <th scope="col">{translate("Status")}</th>
                            <th scope="col">{translate("Actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {last.map((item) => (
                            <tr
                            className={`${item.status === "proccessing" && "table-active"} ${
                                item.status === "success" && "table-success"
                            } ${item.status === "failed" && "table-danger"}`}
                            >
                                <td scope="row ">{item.transid}</td>
                                <td className="table-dadnger">{item.provider}</td>
                                <td>{item.number}</td>
                                <td>₪ {item.cardamount || 0}</td>
                                <td>{moment(item.datetime).format("YYYY-MM-DD / HH:mm:ss")}</td>
                                <td>{translate(item.status)}</td>
                                <td>
                                    {item.status == "failed" && (
                                        <Button size="sm" onClick={() => showReason(item.transid)} disabled={loading}>
                                            {translate("Show Reason")}
                                        </Button>
                                    )}
                                    {item.status == "succuss" && (
                                        <Button size="sm" onClick={() => cancelTransaction(item.transid)} disabled={loading}>
                                            {translate("Cancel")}
                                        </Button>
                                    )}
                                </td>
                            </tr>
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
  