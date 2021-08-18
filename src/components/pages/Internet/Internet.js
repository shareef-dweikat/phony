import { useEffect, useState } from "react";
import { connect } from "react-redux";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import { isEmpty } from "lodash";
import { getInternts } from "../../../actions/internetAction";
import { useIntl } from 'react-intl';
import Spinner from "../../ui/spinner/Spinner";
import "./style.css";

const Languages = {
  "en": "english",
  "ar": "arabic",
  "il": "israel",
};

const Internet = ({ getInternts, internets }) => {
  const intl = useIntl()
  const [loading, isLoading] = useState([]);
  const [columnStyle, setColumnStyle] = useState("col-lg-3 col-md-4 col-sm-6 card-md");

  useEffect(() => {
    document.title = "Internet | PhonePlay ";
    if (Array.isArray(internets) && isEmpty(internets)) {
      initInternets();
    }
    refreshColumnStyle();
  }, []);

  const initInternets = () => {
    isLoading(true);
    getInternts(Languages[intl.locale])
    .finally(() => {
      isLoading(false);
    })
  }
  const refreshColumnStyle = () => {
    switch(localStorage.size) {
      case "default":
      case "column4":
        setColumnStyle("col-lg-3 col-md-4 col-sm-6 card-md");
        break;
      case "column3":
        setColumnStyle("col-lg-4 col-md-6 col-sm-6 card-lg");
        break;
      case "column6":
        setColumnStyle("col-lg-2 col-md-4 col-sm-6 card-sm");
        break;
    }
  }
  return (
    <div>
      <div className="container insurance style1">
        <div className="row mt-5">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9 col-lg-9 col-md-8 col-sm-6">
            <div>
              <div className="row mb-5">
                {internets.map((internet) => (
                <div className={`${columnStyle} mt-4`}>
                  <div className="card outer-wrapper">
                      <div className="frame">
                        <img
                          alt={internet.id}
                          src={`http://${internet.url}`}
                        />
                      </div>
                      <div className="card nav-layout">
                        <h5 className="m-2 text-center">{internet.name}</h5>
                        <h6 className="m-2 text-center">{translate("Phone Number")}<br/>{internet.phone}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {loading && (<Spinner />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  internets: state.internets.list,
});

export default connect(mapStateToProps, { getInternts })(Internet);

