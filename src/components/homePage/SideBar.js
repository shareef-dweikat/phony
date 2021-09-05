import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import { connect } from "react-redux";
import "./sidebar.css";
import { currentRates } from "../../actions/currencyAction";
import _ from "lodash";
import Spinner from "../ui/spinner/Spinner";

const SideBar = ({ user }) => {
  const history = useHistory().location.pathname;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [engagespotInit, isEngagespotInit] = useState(false);
  const [rates, setRates] = useState([]);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    updateCurrencyRate();
    updateEngagespot();
  }, [])

  const updateEngagespot = () => {
    if (!engagespotInit && currentUser?.sellerid) {
      window.Engagespot?.identifyUser(currentUser?.sellerid);
      isEngagespotInit(true);
    }
  }

  const updateCurrencyRate = () => {
    isLoading(true);
    currentRates()
    .then((rates) => {
      setRates(rates)
      isLoading(false)
    });
  }

  return (
    <div>
      <div className="sidebar">
        <div class="widget-flat card">
          <div class="card-body">
            <h5 class="text-muted mt-0" title="Balance" style={{fontSize: "1rem"}}>{translate("Balance Avaliable")}</h5>
            <h3 class="text-info my-2 mb-1">₪ {currentUser && currentUser.balance}</h3>

            <hr className="divider my-2"></hr>

            <h5 class="text-muted mt-0" title="Debt" style={{fontSize: "1rem"}}>{translate("Debt")}</h5>
            <h3 class="text-danger my-2">₪ {currentUser && currentUser.debth}</h3>

            <hr className="divider my-2"></hr>

            <h5 class="text-muted mt-0" title="Points" style={{fontSize: "1rem"}}>{translate("Points")}</h5>
            <h3 class="text-success my-2">₪ {currentUser && currentUser.points}</h3>

            <p class="user-info mb-0 px-2 text-muted">
              <span class="username text-nowrap ms-1">{(user?.sellername || currentUser?.sellername)}</span>
              <span class="text-nowrap mx-2">|</span>
              <span class="text-nowrap me-1">{(user?.sellerid || currentUser.sellerid)}</span>
            </p>
          </div>
        </div>
      
        <div className="mt-3">
          <div
            className={`sidebar__link ${
              history === "/" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/">
              <span>
                <i className="icon-main fa fa-home m-2"></i>
                {translate("Home")}
              </span>
            </a>
          </div>
          <div
            className={`sidebar__link ${
              history === "/internet" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/internet">
              <span>
                <i
                  className="icon-main fas fa-globe  m-2"
                  aria-hidden="true"
                ></i>
                {translate("Internet")}
              </span>
            </a>
          </div>
          <div
            className={`sidebar__link ${
              history === "/insurance" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/insurance">
              <span>
                <i
                  className="icon-main fas fa-car-crash  m-2"
                  aria-hidden="true"
                ></i>
                {translate("Insurance")}
              </span>
            </a>
          </div>
          <div
            className={`sidebar__link ${
              history === "/gaming" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/gaming">
              <span>
                <i
                  className="icon-main fa fa-gamepad  m-2"
                  aria-hidden="true"
                ></i>
                {translate("Gaming")}
              </span>
            </a>
          </div>
          <div
            className={`sidebar__link ${
              history === "/cards" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/cards">
              <span>
                <i
                  className="icon-main fa fa-credit-card  m-2"
                  aria-hidden="true"
                ></i>
                {translate("Gift Cards")}
              </span>
            </a>
          </div>
          <div
            className={`sidebar__link ${
              history === "/points" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/points">
              <span>
                <i
                  className="icon-main fa fa-hand-pointer  m-2"
                  aria-hidden="true"
                ></i>
                {translate("points")}
              </span>
            </a>
          </div>

          <div
            className={`sidebar__link ${
              history === "/messages" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/messages">
              <span>
                <i
                  className="icon-main fa fa-comments  m-2"
                  aria-hidden="true"
                ></i>
                {translate("messages")}
              </span>
            </a>
          </div>
          <div
            className={`sidebar__link ${
              history === "/messages" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/discounts">
              <span>
                <i
                  className="icon-main fa fa-tags  m-2"
                  aria-hidden="true"
                ></i>
                {translate("discounts")}
              </span>
            </a>
          </div>
          <div
            className={`sidebar__link ${
              history === "/report" && "active-link"
            } m-4`}
          >
            <a className="link-main " href="/report">
              <span>
                <i className="icon-main fa fa-file m-2" aria-hidden="true"></i>
                {translate("Report")}
              </span>
            </a>
          </div>
        </div>

        <div className="card card-currency">
          <div className="card-body">
            <h6>{translate("Currency exchange rates")}</h6>
            <hr class="divider my-2"></hr>
            <table className="currecy-rates">
              <thead>
                <tr>
                  <th>{translate("Currency")}</th>
                  <th>{translate("Price")}</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr>
                    <td>{translate(_.trim(rate.currency) + " / ILS")}</td>
                    <td>{rate.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && (<Spinner type="inner"/>)}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(SideBar);
