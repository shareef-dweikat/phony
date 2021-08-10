import React, { useEffect, useState } from "react";
import "./style.css";
import Spinner from "../../ui/spinner/Spinner";
import translate from "../../../i18n/translate";
import isEmpty from "../../../validation/is_empty";

const Summary = ({selectedItems, onAdd, onRemove, onSubmit}) => {
    console.log(selectedItems);
    const [items, setItems] = useState({});
    const [total, setTotal] = useState(0.0);
    const [loadingSpinner, isLoading] = useState(false);

    const _onRemove = (type) => {
        const newItems = { ...selectedItems };
        delete newItems[type];
        setItems(newItems);
        localStorage.removeItem(type);
        onRemove(type);
    };

    const _onSubmit = (e) => {
        isLoading(true);
        onSubmit(e);
    };

    useEffect(() => {
        setItems({...selectedItems});
    }, []);

    useEffect(() => {
        const total = Object.values(items).reduce((prev, curr) => {
            if (isEmpty(curr)) return prev;
            return parseFloat(prev) + parseFloat(curr.price);
        }, 0);
        setTotal(total);
    }, [items])

    return (
        <div className="row">
            <div className="col-10">
                <div className="card m-4s fixed-top1 position-sticky mt-2">
                    <div className="row mt-1 fixed-topx px-3">
                        {Object.keys(items).map((type) => {
                            const item = items[type];
                            if (isEmpty(item)) return null;
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                                    <div className="card outer-wrapper">
                                        <div className="frame1">
                                            <img
                                                alt={item.id || item.ID}
                                                src={item.url}
                                                width="260px"
                                                height="100px"
                                                >
                                            </img>
                                            {item.flexiblePrice && <label className="text-abs">{item.price}</label>}
                                            <a className="close-btn" onClick={(e) => _onRemove(type)}>
                                                <i class="fa fa-times" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="col-2">
                <div class="card total-balance-card mt-2">
                    <div class="card-body p-2">
                        <h5 class="text-muted mt-1 mb-2" title="Balance" style={{ fontSize: "1.2rem" }}>{translate("total")}</h5>
                        <h3 class="text-info mt-2">₪ {total } </h3>
                        <button
                            type="submit"
                            class={`btn btn-success ${total === 0 && "disabled"}`}
                            style={{ margin: "auto", display: "block" }}
                            disabled={total === 0 || loadingSpinner}
                            onClick={_onSubmit}
                        >
                            {translate("accept")}
                        </button>
                        {loadingSpinner && <Spinner />}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Summary;
