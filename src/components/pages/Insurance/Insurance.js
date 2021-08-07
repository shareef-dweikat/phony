import { useEffect } from "react";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";
import Insurance1Img from "../../../assests/images/insurances/al_motaheda.png";

const Insurance = () => {
  useEffect(() => {
    document.title = "Insurance | PhonePlay ";
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
              <div className="card img-back">
                <h1 className="header-text">{translate("Insurance")}</h1>
              </div>
            </div>

            <div>
              <div className="row mb-5">
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                  <div className="card outer-wrapper">
                    <div className="frame">
                      <img
                        height="150px"
                        width="200px"
                        alt="Al Motaheda"
                        src={Insurance1Img}
                      />
                    </div>
                    <div className="card cards-layout">
                      <h5 className="m-2 text-center">{translate("Al Motaheda")}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
