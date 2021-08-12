import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import translate from "../../i18n/translate";
import SideBar from "../homePage/SideBar";
import { getCompanyCards } from "../../actions/cardsAction";

const CompanyCards = ({ companyCards, getCompanyCards }) => {
  const history = useHistory();
  useEffect(() => {
    document.title = "Cards | Phone Play";
    getCompanyCards(history.location.pathname.split("/")[2]);
  }, []);
  const backClick = () => history.push("/cards");
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
            <div className="mt-2">
              <div className=" card nav-layout">
                <h5 className="m-3">
                  <button className="mx-3 btn back-btn " onClick={backClick}>
                    {translate("Back")}
                  </button>

                  {history.location.pathname.split("/")[2]}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  companyCards: state.cards.companyCards,
});

export default connect(mapStateToProps, { getCompanyCards })(CompanyCards);
