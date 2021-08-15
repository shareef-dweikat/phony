import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import translate from "../../i18n/translate";
import SideBar from "../homePage/SideBar";
import { getCards } from "../../actions/cardsAction";
const Cards = ({ getCards, cards }) => {
  useEffect(() => {
    document.title = "Electornic Cards | Phone Play";
    getCards();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
            <div className="card card-home">
                          <div className="card img-back" style={
                sessionStorage.getItem("main_picture") ? {backgroundImage: `url("${sessionStorage.getItem("main_picture")}")` } : {}
              }>
                <h1 className="header-text">{translate("electornicCards")}</h1>
              </div>
            </div>

            <div className="mt-5">
              <div className="row">
                {cards.map((ele) => (
                  <>
                    <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                      <Link to ={`/cards/${ele.des}`}>
                        <div className="card outer-wrapper">
                          <div className="frame">
                            <img alt="" src={ele.url} />
                          </div>
                          <div className=" card cards-layout">
                            <h5 className="m-2 text-center">{ele.des}</h5>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
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
  cards: state.cards.cards,
});

export default connect(mapStateToProps, { getCards })(Cards);
