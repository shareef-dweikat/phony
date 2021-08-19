import { useEffect } from "react";
import { Link } from "react-router-dom";
import translate from "../../i18n/translate";
import SideBar from "../homePage/SideBar";

const Gaming = () => {
  useEffect(() => {
    document.title = "Gaming | Phone Play";
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
                <h1 className="header-text">{translate("Gaming")}</h1>
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
                      <h5 className="m-2 text-center">{translate("bubg")}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                  <div className="card outer-wrapper">
                    <div className="frame">
                      <img
                        height="150px"
                        width="200px"
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619307424/WhatsApp_Image_2021-04-18_at_6.55.28_PM_zugq2z.jpg"
                      />
                    </div>
                    <div className=" card cards-layout">
                      <h5 className="m-2 text-center">
                        {translate("fortnite")}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                  <div className="card outer-wrapper">
                    <div className="frame">
                      <img
                        height="150px"
                        width="200px"
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619307445/WhatsApp_Image_2021-04-18_at_6.55.26_PM_rvbd4f.jpg"
                      />
                    </div>
                    <div className=" card cards-layout">
                      <h5 className="m-2 text-center">
                        {translate("mobileLegends")}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                  <div className="card outer-wrapper">
                    <div className="frame">
                      <img
                        height="150px"
                        width="200px"
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619307461/WhatsApp_Image_2021-04-18_at_6.55.24_PM_nrm6ko.jpg"
                      />
                    </div>
                    <div className=" card cards-layout">
                      <h5 className="m-2 text-center">
                        {translate("silkRoad")}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                  <div className="card outer-wrapper">
                    <div className="frame">
                      <img
                        height="150px"
                        width="200px"
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619307488/WhatsApp_Image_2021-04-18_at_6.55.15_PM_so5k2f.jpg"
                      />
                    </div>
                    <div className=" card cards-layout">
                      <h5 className="m-2 text-center">
                        {translate("leageueOfLegends")}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                  <div className="card outer-wrapper">
                    <div className="frame">
                      <img
                        height="150px"
                        width="200px"
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619307494/WhatsApp_Image_2021-04-18_at_6.55.17_PM_pv0esg.jpg"
                      />
                    </div>
                    <div className=" card cards-layout">
                      <h5 className="m-2 text-center">
                        {translate("jawaker")}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                  <div className="card outer-wrapper">
                    <div className="frame ">
                      <img
                        height="150px"
                        width="200px"
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619307508/WhatsApp_Image_2021-04-18_at_6.55.19_PM_xonttc.jpg"
                      />
                    </div>
                    <div className=" card cards-layout">
                      <h5 className="m-2 text-center">
                        {translate("crossFire")}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                  <div className="card outer-wrapper">
                    <div className="frame">
                      <img
                        height="150px"
                        width="200px"
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619307533/WhatsApp_Image_2021-04-18_at_6.55.22_PM_mix2mz.jpg"
                      />
                    </div>
                    <div className=" card cards-layout">
                      <h5 className="m-2 text-center">
                        {translate("freeFire")}
                      </h5>
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

export default Gaming;
