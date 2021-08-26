import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import translate from "../../../i18n/translate";
import { chargeOoredoo } from "../../../actions/companiesAction";
import Spinner from "../../ui/spinner/Spinner";
import Badge from "../../ui/Badge/Badge";
import { isEmpty, isNil } from "lodash";

const Selected = ({ min, setMin, g3, setg3, credit, setCredit, shabab, setShabab, setRom, rom, chargeOoredoo }) => {
  const history = useHistory().location.pathname;
  const pushHistory = useHistory();
  const [loadingSpinner, isLoading] = useState(false);

  const onCreditRemove = () => {
    localStorage.removeItem("ooredooCredit");
    setCredit("");
  };
  const remove3g = () => {
    localStorage.removeItem("ooredoo3g");
    setg3("");
  };
  const removeMin = () => {
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
  const onClickTypeCredit = (e) => {
    e.preventDefault();
    isLoading(true);
    chargeOoredoo(
      {
        ooredoo3g: g3 || null,
        ooredooRom: rom || null,
        ooredooCredit: credit || null,
        ooredooMin: min || null,
        ooredooSuper: shabab || null,
      },
      history,
      pushHistory
    )
    .finally(() => {
      clearSelected();
      isLoading(false);
    });
  };
  const clearSelected = () => {
    onCreditRemove();
    remove3g();
    removeMin();
    removeRom();
    removeShabab();
  }
  return (
    <div className="row">
      <div className="col-10">
        <div className="card m-4s fixed-top1 position-sticky mt-2">
          <div className="row mt-1 fixed-topx px-3">
            {!isNil(credit) && !isEmpty(credit) && (
              <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                <div className="card outer-wrapper">
                  <div className="frame1">
                    <img
                      alt="Ooredoo Credit"
                      src={
                        credit.url ||
                        "https://res.cloudinary.com/dtu4lltbk/image/upload/v1622203339/eced7efa-a16b-4fdd-9528-2c1f10356e1c_lzfhei.jpg"
                      }
                      width="260px"
                      height="100px"
                    ></img>
                    {credit.flexiblePrice && <label className="text-abs-oore">{credit.price}</label>}
                    <a className="close-btn" onClick={onCreditRemove}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}
            {!isNil(min) && !isEmpty(min) && (
              <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                <div className="card outer-wrapper">
                  <div className="frame1">
                    <img alt="Ooredoo Min" src={min.url} width="260px" height="100px"></img>
                    {(min.auto_renew === "True" || min.auto_renew === "true") && (
                      <Badge text={translate("Renewable")}></Badge>
                    )}
                    <a className="close-btn" onClick={removeMin}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}
            {!isNil(g3) && !isEmpty(g3) && (
              <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                <div className="card outer-wrapper">
                  <div className="frame1">
                    <img alt="Ooredoo 3G" src={g3.url} width="260px" height="100px"></img>
                    {(g3.auto_renew === "True" || g3.auto_renew === "true") && (
                      <Badge text={translate("Renewable")}></Badge>
                    )}
                    <a className="close-btn">
                      <i class="fa fa-times" aria-hidden="true" onClick={remove3g}></i>
                    </a>
                  </div>
                </div>
              </div>
            )}
            {!isNil(rom) && !isEmpty(rom) && (
              <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                <div className="card outer-wrapper">
                  <div className="frame1">
                    <img alt="Ooredoo Rom" src={rom.url} width="260px" height="100px"></img>
                    {(rom.auto_renew === "True" || rom.auto_renew === "true") && (
                      <Badge text={translate("Renewable")}></Badge>
                    )}
                    <a className="close-btn" onClick={removeRom}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}
            {!isNil(shabab) && !isEmpty(shabab) && (
              <div className="col-lg-3 col-md-4 col-sm-4 mt-3">
                <div className="card outer-wrapper">
                  <div className="frame1">
                    <img alt="Ooredoo Shabab" src={shabab.url} width="260px" height="100px"></img>
                    {(shabab.auto_renew === "True" || shabab.auto_renew === "true") && (
                      <Badge text={translate("Renewable")}></Badge>
                    )}
                    <a className="close-btn" onClick={removeShabab}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-2">
        <div class="card total-balance-card mt-2">
          <div class="card-body p-2">
            <h5 class="text-muted mt-1 mb-2" title="Balance" style={{fontSize: "1.2rem" }}>{translate("total")}</h5>
            <h3 class="text-info mt-2">₪ {(credit?.price ? parseFloat(credit?.price) : 0) +
              (rom?.price ? parseFloat(rom?.price) : 0) +
              (g3?.price ? parseFloat(g3?.price) : 0) +
              (min?.price ? parseFloat(min?.price) : 0)}
            </h3>
            <button
              type="submit"
              class={`btn btn-success ${
                (credit?.price ? parseFloat(credit?.price) : 0) +
                  (rom?.price ? parseFloat(rom?.price) : 0) +
                  (g3?.price ? parseFloat(g3?.price) : 0) +
                  (min?.price ? parseFloat(min?.price) : 0) ===
                  0 && "disabled"
              }`}
              style={{margin: "auto", display: "block"}}
              disabled={loadingSpinner}
              onClick={onClickTypeCredit}
            >
              {translate("accept")}
            </button>
            {loadingSpinner && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { chargeOoredoo })(Selected);
