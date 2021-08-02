import { useEffect, useState } from "react";
import translate from "../../../i18n/translate";
import { useHistory } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import Message from "../../common/Message";
import TextFieldGroup from "../../common/TextFieldGroup";
const InputAzy = () => {
  useEffect(() => {
    document.title = "Home /Azy ";
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
  return (
    <>
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
                  <h5 className="m-3 s ">
                    <button onClick={() => history.push("/")} className="btn btn-back mx-3 ">
                      {translate("Back")}
                    </button>
                    {translate("mobile12")}
                  </h5>
                </div>
              </div>
            </div>
            <form className="m-5" onSubmit={onSubmit}>
              {isEmpty && <Message msg="Enter valid number" />}
              <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">
                  {translate("jawwalNo")}
                </label>
                <div className="col-sm-5 ">
                  <TextFieldGroup value={value} onChange={(e) => setValue(e.target.value)} type="number" />
                </div>
                <div className="col-sm-3">
                  <button style={{ width: "110%" }} type="submit" className="btn sign-but p-2 w-30" onSubmit={onSubmit}>
                    {translate("next")}{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputAzy;
