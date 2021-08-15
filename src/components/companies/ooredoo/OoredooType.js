import { useEffect, useState } from "react";
import translate from "../../../i18n/translate";
import { useHistory, Link } from "react-router-dom";
import SideBar from "../../homePage/SideBar";

import "./ooredoo.css";
const OoredooType = () => {
  const history = useHistory().location.pathname;
  useEffect(() => {
    document.title = "Ooredoo | Phone Play";
  }, []);
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home">
              <div className="card img-back" style={
                sessionStorage.getItem("main_picture") ? {backgroundImage: `url("${sessionStorage.getItem("main_picture")}")` } : {}
              }>
              <div className="m-3">
                <h1 className="header-text mt-5">{translate("newProduct")}</h1>
              </div>
            </div>
            <div className="mt-2">
              <div className=" card oor-layout">
                <h5 className="m-3 mx-4 " style={{ fontWieght: "bolder" }}>
                  Ooredoo
                </h5>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className=" card ">
              <div className="form-group row m-2">
                <div className="col-sm-1"></div>
                <label
                  for="inputEmail3"
                  className="col-sm-3 col-form-label sub-text"
                >
                  {translate("jawwalNo")}
                </label>
                <label
                  for="inputEmail3"
                  className="col-sm-5 col-form-label ooredoo-text "
                >
                  {history.split("/")[3].slice(0, 3) +
                    "-" +
                    history.split("/")[3].slice(3, 6) +
                    "-" +
                    history.split("/")[3].slice(6, 10)}
                </label>
              </div>
            </div>
          </div>
          <div className="card mt-3  ">
            <div className="row d-flex justify-content-center ">
              <div className="col-lg-2 col-md-4 col-sm-6 mt-4 mx-2 ">
                <div className="card outer-wrapper">
                  <Link to={`/company/ooredoo/credit/${history.split("/")[3]}`}>
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619564666/73796e16-ce8d-4138-a0ec-254995ab3df1_gqfdgj.jpg"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center ooredoo-sub">
                        {translate("etopup")}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-sm-6 mt-4 mx-2 ">
                <div className="card outer-wrapper">
                  <Link
                    to={`/company/ooredoo/minutes/${history.split("/")[3]}`}
                  >
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619564666/73796e16-ce8d-4138-a0ec-254995ab3df1_gqfdgj.jpg"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center ooredoo-sub">
                        {translate("minutes")}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-sm-6 mt-4 mx-2">
                <div className="card outer-wrapper">
                  <Link to={`/company/ooredoo/3g/${history.split("/")[3]}`}>
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619564666/73796e16-ce8d-4138-a0ec-254995ab3df1_gqfdgj.jpg"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center ooredoo-sub">
                        {translate("ooredoo3g")}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-sm-6 mt-4 mx-2">
                <div className="card outer-wrapper">
                  <Link to={`/company/ooredoo/rom/${history.split("/")[3]}`}>
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619564666/73796e16-ce8d-4138-a0ec-254995ab3df1_gqfdgj.jpg"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center ooredoo-sub">
                        {translate("rom")}
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-sm-6 mt-4 mx-2">
                <div className="card outer-wrapper">
                  <Link to={`/company/ooredoo/shabab/${history.split("/")[3]}`}>
                    <div className="frame">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/dtu4lltbk/image/upload/v1619564666/73796e16-ce8d-4138-a0ec-254995ab3df1_gqfdgj.jpg"
                        width="120px"
                      />
                    </div>
                    <div className=" card ">
                      <h5 className="m-2 text-center ooredoo-sub">
                        {translate("superShabab")}
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

export default OoredooType;
