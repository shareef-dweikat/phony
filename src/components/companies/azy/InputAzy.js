import { useEffect, useState } from "react";
import translate from "../../../i18n/translate";
import { useHistory } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import Message from "../../common/Message";
import TextFieldGroup from "../../common/TextFieldGroup";
import "./style.css";

const InputAzy = () => {
  useEffect(() => {
    document.title = "Azy | Phone Play";
  }, []);
  const [value, setValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();

    if (value === undefined || value.split("").length < 10 || value.split("").length > 10) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);

      history.push(`/company/azy/${value}`);
    }
  };
  const backClick = () => history.push("/");
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <SideBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="card card-home azy">
            <div className="mt-2">
              <div className="card nav-layout">
                <h5 className="m-3">
                  <button className="mx-3 btn back-btn " onClick={backClick}>
                    {translate("Back")}
                  </button>
                  <span>{translate("mobile12")}</span>
                </h5>
              </div>
            </div>
          </div>
          <form className="my-5" onSubmit={onSubmit}>
            {isEmpty && <Message msg="Enter valid number" />}
            <div className="form-group row">
              <div className="col-12 col-md-7 d-flex">
                <label for="inputEmail3" className="col-3 col-form-label" style={{fontSize: "1.6rem", width: "40%"}}>
                  {translate("Mobile Number")}
                </label>
                <div className="input-container" style={{width: "60%"}}>
                  <TextFieldGroup
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus={true}
                  />
                </div>
              </div>
              <div className="col-3 col-md-2">
                <button style={{ width: "110%" }} type="submit" className="btn sign-but p-2 w-30" onSubmit={onSubmit}>
                  {translate("next")}{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputAzy;
