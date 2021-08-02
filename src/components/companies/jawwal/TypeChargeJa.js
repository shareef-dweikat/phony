import { useEffect, useState } from "react";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
const TypeChargeJa = () => {
  const history = useHistory().location.pathname;
  const historyPush= useHistory()
  useEffect(() => {
    document.title = "Home /Jawwal ";
  }, []);
  const backClick = () => historyPush.goBack();

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
            <div className="card img-back">
              <div className="m-3">
                <h1 className="header-text mt-5">{translate("newProduct")}</h1>
              </div>
            </div>
            <div className="mt-2">
              <div className=" card nav-layout">
                <h5 className="m-3">
                  <button className="mx-3 btn back-btn " onClick={backClick}>
                    {translate("Back")}
                  </button>

                  {translate("jawwal")}
                </h5>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className=" card jawwal-layout">
              <div className="form-group row m-2">
                <div className="col-sm-1"></div>
                <label for="inputEmail3" className="col-sm-3 col-form-label">
                  {translate("jawwalNo")}
                </label>
                <label
                  for="inputEmail3"
                  className="col-sm-4 col-form-label mobile-no"
                >
                  {history.split("/")[3].slice(3, 6) +
                    "-" +
                    history.split("/")[3].slice(6, 9) +
                    "-" +
                    history.split("/")[3].slice(9, 13)}
                </label>
              </div>
            </div>
          </div>
          <div className="card mt-3  ">
            <div className="row d-flex  justify-content-center  m-5">
              <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                <div className="card outer-wrapper">
                  <Link to={`/company/jawwalCredit/${history.split("/")[3]}`}>
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619564666/73796e16-ce8d-4138-a0ec-254995ab3df1_gqfdgj.jpg"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center creadit-text">
                        {translate("addCreadit")}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                <div className="card outer-wrapper">
                  <Link
                    to={`/company/jawwal3g/${history.split("/")[3]}`}
                    data-toggle="tooltip"
                    title="Popover title"
                    data-container="body"
                    data-content="And here's some amazing content. It's very engaging. Right?"
                  >
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619564631/ca129436-c033-41b7-84b0-0ec8f7a376ba_y2kn2l.jpg"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center creadit-text">
                        {translate("g3")}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                <div className="card outer-wrapper">
                  <Link to={`/company/jawwalMin/${history.split("/")[3]}`}>
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619565235/2d41acbc-d12c-4d93-a4b4-993893c47678_hpbjnm.jpg"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center creadit-text">
                        {translate("minutes")}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 mt-4">
                <div className="card outer-wrapper">
                  <Link
                    to={`/company/jawwalRom/${history.split("/")[3]}`}
                    data-toggle="tooltip"
                    title="Popover title"
                    data-container="body"
                    data-content="And here's some amazing content. It's very engaging. Right?"
                  >
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619131437/jawwal-logo_jrbpa3.png"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center creadit-text">
                        {translate("rom")}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeChargeJa;
