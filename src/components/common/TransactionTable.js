import React, { useState, useEffect } from "react";
import translate from "../../i18n/translate";
import { getLastTransaction, showTransctionDetails } from "../../actions/reportsAction";
import moment from "moment";
import Spinner from "../ui/spinner/Spinner";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import swal from 'sweetalert';
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

    const updateClick = () => {
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
            swal({
                title: `${intl.formatMessage({ id: "Transaction" })} #${tranId}`,
                text: res,
                icon: "info",
                button: intl.formatMessage({ id:"OK" }),
            });
        });
    }

    return (
        <div className="transactions">
            <div className="mt-5 d-flex flex-row-reverse">
                <button className="btn rom-selected" onClick={updateClick} disabled={loading}>
                    {translate("Update")}
                </button>
            </div>
            <div className="my-3 position-relative">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col ">{translate("Transaction")}</th>
                            <th scope="col">{translate("Provider")}</th>
                            <th scope="col">{translate("MobileNo.")}</th>
                            <th scope="col">{translate("Amount")}</th>
                            <th scope="col">{translate("Data & Time")}</th>
                            <th scope="col">{translate("Status")}</th>
                            <th scope="col">{translate("Reason")}</th>
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
                                    <Button size="sm" onClick={() => showReason(item.transid)} disabled={loading}>
                                        {translate("Show")}
                                    </Button>
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
  