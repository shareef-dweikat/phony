import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import translate from "../../i18n/translate";
import { connect } from "react-redux";
import { useIntl } from 'react-intl';
import "./sidebar.css";
import { currentRates } from "../../actions/currencyAction";
import setRequestHeader from "../../components/common/setRequestHeader";
import _ from "lodash";
import Spinner from "../ui/spinner/Spinner";

const SideBar = ({ user ,userData }) => {
  const history = useHistory().location.pathname;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const intl = useIntl();
  const [engagespotInit, isEngagespotInit] = useState(false);
  const [rates, setRates] = useState([]);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    updateCurrencyRate();
    updateEngagespot();
  }, [])

  const updateEngagespot = () => {
    if (!engagespotInit && currentUser["seller id"]) {
      window.Engagespot?.identifyUser(currentUser["seller id"]);
      setRequestHeader("X-Identifier", currentUser["seller id"]);
      isEngagespotInit(true);
    }
  }

  const updateCurrencyRate = () => {
    isLoading(true);
    currentRates("ILS", ["USD","JOD","EUR"])
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
            <h5 class="text-muted mt-0" title="Balance" style={{fontSize: "1rem"}}>{translate("balance")}</h5>
            <h3 class="text-info my-2 mb-1">₪ {(userData && userData.balance) || (currentUser && currentUser.balance)}</h3>

            <hr className="divider my-2"></hr>

            <h5 class="text-muted mt-0" title="Debt" style={{fontSize: "1rem"}}>{translate("Debt")}</h5>
            <h3 class="text-danger my-2">₪ {(userData && userData.debth) || (currentUser && currentUser.debth)}</h3>

            <hr className="divider my-2"></hr>

            <h5 class="text-muted mt-0" title="Points" style={{fontSize: "1rem"}}>{translate("Points")}</h5>
            <h3 class="text-success my-2">₪ {(userData && userData.points) || (currentUser && currentUser.points)}</h3>

            <p class="user-info mb-0 px-2 text-muted">
              <span class="username text-nowrap ms-1">{(user.sellername)}</span>
              <span class="text-nowrap mx-2">|</span>
              <span class="text-nowrap me-1">{(userData && userData["seller id"]) || (currentUser && currentUser["seller id"])}</span>
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
                {translate("home")}
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
                {translate("internet")}
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
                {translate("gaming")}
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
                {translate("cards")}
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
  userData: state.auth.userData,
});
export default connect(mapStateToProps, {})(SideBar);
