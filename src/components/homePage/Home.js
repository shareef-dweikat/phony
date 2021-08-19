import { useEffect, useState } from "react";
import translate from "../../i18n/translate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SideBar from "./SideBar";
import TransactionTable from "../common/TransactionTable";
import "./home.css";

const Home = ({ user }) => {
  const [columnStyle, setColumnStyle] = useState("col-lg-2 col-md-4 col-sm-6 card-sm");
  useEffect(() => {
    document.title = "Home | Phone Play";
    refreshColumnStyle();
  }, []);

  const refreshColumnStyle = () => {
    switch(localStorage.size) {
      case "column4":
        setColumnStyle("col-lg-3 col-md-4 col-sm-6 card-md");
        break;
      case "column3":
        setColumnStyle("col-lg-4 col-md-6 col-sm-6 card-lg");
        break;
      case "default":
      case "column6":
        setColumnStyle("col-lg-2 col-md-4 col-sm-6 card-sm");
        break;
    }
  }

  return (
    <div className="home container style1">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
            <div className="card img-back" style={
                sessionStorage.getItem("main_picture") ? {backgroundImage: `url("${sessionStorage.getItem("main_picture")}")` } : {}
              }>
              <h1 className="header-text">{translate("Companies")}</h1>
            </div>
          </div>
          <div className="">
            <div className="row">
              {user.jawwal === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/jawwalNo">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131437/jawwal-logo_jrbpa3.png"
                          width="120px"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("jawwal")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user.ooredoo === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/ooredoo/MobileNumer">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619203748/Ooredoo_logo_2017_mtdkir.png"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("ooredoo")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user.cellcom === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/group/cellcom">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131463/unnamed_vyhnbk.png"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("cellcom")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user.pelephone === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/group/pelephone">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131481/Pelephoneisrael-1_dtntrq.png"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("pelephone")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user.golan === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/group/golan">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131493/GolanTelecom.svg_oyiuo3.png"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("golan")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user.mobile012 === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/group/mobile012">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131496/019-mobile-new_ifamyv.png"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("O1Mobile")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user.azy === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/azy">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131513/1229px-012_Mobile_Logo.svg_jpmad3.png"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("mobile12")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user.hot === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/hot">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131544/Hotmobilelogo.svg_gjfklv.png"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("hotMobile")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              {user.partner === "true" && (
                <div className={`${columnStyle} mt-4`}>
                  <Link to="/company/group/partner">
                    <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131635/1280px-Partner_logo.svg_klbypu.png"
                        />
                      </div>
                      <div className=" card nav-layout">
                        <h5 className="m-2 text-center">{translate("partner")}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              <TransactionTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Home);
