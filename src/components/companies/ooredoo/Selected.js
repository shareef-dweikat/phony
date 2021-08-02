import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import TextFieldGroup from "./../../common/TextFieldGroup";
import translate from "../../../i18n/translate";
import { chargeOoredoo } from "../../../actions/companiesAction";
const Selected = ({ min, setMin, g3, setg3, credit, setCredit, shabab, setShabab, setRom, rom, chargeOoredoo }) => {
  const history = useHistory();
  const [inputForm, setInputForm] = useState({
    dis: "",
    price: null,
    url: null,
    ID: "",
  });
  useEffect(() => {
    if (localStorage.ooredooCredit) {
      console.log("dddddddddd");
    }
  }, []);
  const onCreditRemove = () => {
    localStorage.removeItem("ooredooCredit");
    setCredit("");
  };
  const remove3g = () => {
    localStorage.removeItem("ooredoo3g");
    setg3("");
  };
  const removemin = () => {
    localStorage.removeItem("ooredooMin");
    setMin("");
  };
  const removeRom = () => {
    localStorage.removeItem("ooredooRom");
    setRom("");
  };
  const removeShabab = () => {
    localStorage.removeItem("ooredooSuper");
    setShabab("");
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
    setCredit({ price: e.target.value });
    localStorage.ooredooCredit = JSON.stringify({ price: e.target.value });
  };
  const onChargeClick = (e) => {
    e.preventDefault()
    chargeOoredoo(history)
  };
  return (
    <div>
      <div className="card m-4s fixed-top1 position-sticky mt-2">
        <div className=" row mt-1 fixed-topx">
          {credit !== "" ? (
            <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
              <div className="card outer-wrapper  px-3">
                <div className="frame1">
                  <img
                    alt="sssssssssss"
                    src={
                      credit.url || "https://res.cloudinary.com/dtu4lltbk/image/upload/v1623092436/Group_334_dgbvez.png"
                    }
                    width="260px"
                    height="100px"
                  ></img>
                  {!credit.url && (
                    <label className="text-abs-oore">
                      <small>{credit.price}</small>
                    </label>
                  )}
                  <a className="close-btn" onClick={onCreditRemove}>
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
          {g3 !== "" && (
            <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
              <div className="card outer-wrapper  px-3">
                <div className="frame1">
                  <img alt="sssssssssss" src={g3.url} width="260px" height="100px"></img>
                  <a className="close-btn" onClick={remove3g}>
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          )}
          {min !== "" && (
            <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
              <div className="card outer-wrapper  px-3">
                <div className="frame1">
                  <img alt="sssssssssss" src={min.url} width="260px" height="100px"></img>
                  <a className="close-btn" onClick={removemin}>
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          )}
          {rom !== "" && (
            <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
              <div className="card outer-wrapper  px-3">
                <div className="frame1">
                  <img alt="sssssssssss" src={rom.url} width="260px" height="100px"></img>
                  <a className="close-btn">
                    <i class="fa fa-times" aria-hidden="true" onClick={removeRom}></i>
                  </a>
                </div>
              </div>
            </div>
          )}
          {shabab !== "" && (
            <div className="col-lg-4 col-md-4 col-sm-4 mt-4">
              <div className="card outer-wrapper  px-3">
                <div className="frame1">
                  <img alt="sssssssssss" src={shabab.url} width="260px" height="100px"></img>
                  <a className="close-btn">
                    <i class="fa fa-times" aria-hidden="true" onClick={removeShabab}></i>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <form class="form-inline mt-5">
        <div class=" d-flex justify-content-between ">
          {history.location.pathname.split("/")[3] === "credit" && (
            <div className="row">
              <div className="col-md-3">
                <label for="colFormLabelLg" class="col-sm-1 col-form-label col-form-label-lg">
                  {translate("Credit")}
                </label>
              </div>

              <div className="col-md-9">
                <TextFieldGroup
                  style={{ width: "100%" }}
                  className="mb-5 "
                  name="price"
                  type="number"
                  value={inputForm.price}
                  onChange={onChange}
                />
              </div>
            </div>
          )}
          <label for="colFormLabelLg" class="col-sm-1 col-form-label col-form-label-lg">
            {translate("total")}
          </label>
          <div class="col-sm-1 text-center text-bold">
            <label class=" form-control-lg">
              {(credit.price ? +credit.price : 0) +
                (min.price ? +min.price : 0) +
                (g3.price ? +g3.price : 0) +
                (shabab.price ? +shabab.price : 0) +
                (rom.price ? +rom.price : 0)}
            </label>
          </div>
          <button
            type="submit"
            class={`col-sm-2 btn btn sign-but ${
              (min.price ? +min.price : 0) +
                (g3.price ? +g3.price : 0) +
                (shabab.price ? +shabab.price : 0) +
                (rom.price ? +rom.price : 0) +
                (credit.price ? +credit.price : 0) ===
                0 && "disabled"
            }`}
            onClick={onChargeClick}
          >
            {translate("accept")}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { chargeOoredoo })(Selected);
