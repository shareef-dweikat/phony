import { useEffect } from "react";
import translate from "../../../i18n/translate";
import SideBar from "../../homePage/SideBar";

const Internet = () => {
  useEffect(() => {
    document.title = "Internet | PhonePlay ";
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
                <h1 className="header-text">{translate("internet")}</h1>
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
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619307399/WhatsApp_Image_2021-04-18_at_6.55.13_PM_lax47a.jpg"
                      />
                    </div>
                    <div className=" card cards-layout">
                      <h5 className="m-2 text-center">{translate("hadara")}</h5>
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

export default Internet;
