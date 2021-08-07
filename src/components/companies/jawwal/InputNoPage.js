import { useEffect, useState } from "react";
import translate from "../../../i18n/translate";
import { useHistory } from "react-router-dom";
import SideBar from "../../homePage/SideBar";
import Message from "../../common/Message";
import TextFieldGroup from "../../common/TextFieldGroup";
import "react-phone-number-input/style.css";
const InputNoPage = () => {
  useEffect(() => {
    document.title = "Home /Jawwal ";
  }, []);
  const [value, setValue] = useState();
  const [isEmprty, setIsEmprty] = useState(false);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === undefined || value.split("").length < 10 || value.split("").length > 10) {
      setIsEmprty(true);
    } else {
      setIsEmprty(false);
      // localStorage.setItem("chargeJawwal", JSON.stringify({ charge: [] }));
      localStorage.removeItem("jawwalMin");
      localStorage.removeItem("jawwal3g");
      localStorage.removeItem("JawwalCredit");
      localStorage.removeItem("JawwalRom");
      history.push(`/company/jawwalCredit/${"+97" + value}`);
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
          <div className="card card-home">
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
          <form className="my-5" onSubmit={onSubmit}>
            {isEmprty && <Message msg="Enter valid number" />}
            <div className="form-group row">
              <div className="col-12 col-md-7 d-flex">
                <label for="inputEmail3" className="col-3 col-form-label" style={{fontSize: "1.6rem", minWidth: 160}}>
                  {translate("jawwalNo")}
                </label>
                <TextFieldGroup value={value} onChange={(e) => setValue(e.target.value)} type="number" autoFocus={true} />
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

export default InputNoPage;
