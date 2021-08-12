import axios from "axios";
import sha256 from 'crypto-js/sha256';

import {
  GET_JAWWAL_3G,
  GET_JAWWAL_CREDIT,
  GET_JAWWAL_MIN,
  CLEAR_ERRORS,
  GET_ERRORS,
  ADD_JAWWAL_CHARGE,
  GET_JAWWAL_CHARGE,
  GET_NOT_RENEW_JAWWAL_MIN,
  GET_RENEW_JAWWAL_MIN,
  GET_RENEW_JAWWAL_3G,
  GET_JAWWAL_ROM,
  GET_NOT_RENEW_JAWWAL_3G,
  GET_OOREDOO_3G,
  GET_OOREDOO_MIN,
  GET_OOREDOO_ROM,
  GET_OOREDOO_SUPER,
  LOADING_TRUE,
  GET_RENEW_OOREDOO_SUPER,
  GET_OOREDOO_RENEW_ROM,
  GET_NOR_RENEW_OOREDOO_SUPER,
  GET_OOREDOO_NOT_RENEW_ROM,
  GET_OOREDOO_NOT_RENEW_3G,
  GET_OOREDOO_RENEW_3G,
  GET_OOREDOO_RENEW_MIN,
  GET_OOREDOO_NOT_RENEW_MIN,
  GET_GROUP_COMPANIES,
  GET_AZY,
  GET_HOT,
} from "./types";
import Notiflix from "notiflix";

var lang;
if (localStorage.langCity === "en") {
  lang = "english";
} else if (localStorage.langCity === "ar") {
  lang = "arabic";
} else if (localStorage.langCity === "is") {
  lang = "israel";
} else {
  lang = "english";
}
//jawwal Actions

const BASE_API_URL = process.env.REACT_APP_BASE_API;

export const getJawwal3g = (mobileNo, refresh) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_JAWWAL_3G,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });

  const storageHash = sha256(`N${mobileNo}T3g`).toString();
  const jawwal3g = JSON.parse(localStorage.getItem(storageHash));
  if (!refresh && jawwal3g) {
    dispatch({
      type: GET_JAWWAL_3G,
      payload: jawwal3g,
    });
  } else {
    axios.post(
      `${BASE_API_URL}/JAB?number=${mobileNo
        .split("-")
        .join("")}&bundle=3g&language=${lang}&refresh=${refresh}`
    )
    .then((res) => {
      dispatch({
        type: GET_JAWWAL_3G,
        payload: res.data,
      })
      localStorage.setItem(storageHash, JSON.stringify(res.data));
    })
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  }
};

export const getJawwalRom = (mobileNo, refresh) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_JAWWAL_ROM,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });

  const storageHash = sha256(`N${mobileNo}TRom`).toString();
  const jawwalRom = JSON.parse(localStorage.getItem(storageHash));
  if (!refresh && jawwalRom) {
    dispatch({
      type: GET_JAWWAL_ROM,
      payload: jawwalRom,
    });
  } else {
    axios.post(
      `${BASE_API_URL}/JAB?number=${mobileNo
        .split("-")
        .join("")}&bundle=rom&language=arabic&refresh=${refresh}`
    )
    .then((res) => {
      dispatch({
        type: GET_JAWWAL_ROM,
        payload: res.data,
      })
      localStorage.setItem(storageHash, JSON.stringify(res.data));
    })
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  }
};

export const getJawwalCredit = (mobileNo) => (dispatch) => {
  dispatch(clearErrors());
  console.log(mobileNo.slice(4));
  axios
    .post(
      `${BASE_API_URL}/JAB?number=${mobileNo
        .split("-")
        .join("")}&bundle=jawwalMin&language=${lang}`
    )
    .then((res) =>
      dispatch({
        type: GET_JAWWAL_CREDIT,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      })
    );
};

export const getJawwalMin = (mobileNo, refresh) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_JAWWAL_MIN,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  
  const storageHash = sha256(`N${mobileNo}TMin`).toString();
  const jawwalMin = JSON.parse(localStorage.getItem(storageHash));
  if (!refresh && jawwalMin) {
    dispatch({
      type: GET_JAWWAL_MIN,
      payload: jawwalMin,
    });
  } else {
    axios
    .post(
      `${BASE_API_URL}/JAB?number=${mobileNo
        .split("-")
        .join("")}&bundle=min&language=${lang}&refresh=${refresh}`
    )
    .then((res) => {
      dispatch({
        type: GET_JAWWAL_MIN,
        payload: res.data,
      });
      localStorage.setItem(storageHash, JSON.stringify(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  }
};

export const getRnewJawwalMin = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_RENEW_JAWWAL_MIN,
  });
};
export const getNotRnewJawwalMin = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_NOT_RENEW_JAWWAL_MIN,
  });
};

export const getRnewJawwal3g = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_RENEW_JAWWAL_3G,
  });
};
export const getNotRnewJawwal3g = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_NOT_RENEW_JAWWAL_3G,
  });
};

export const chargeJawwal = (data, history, pushHistory) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const sallerId = JSON.parse(localStorage.companies).sellerid;
  const reqToken = sallerId + token;
  const number = history.split("/")[3].slice(3);
  
  // console.log(data, number, pushHistory ,lang ,data.jawwalCredit.price);
  if (data.jawwal3g !== null && data.jawwal3g !== undefined) {
    console.log(data.jawwal3g.ID.substring(0, data.jawwal3g.ID.length - 4));

    Notiflix.Notify.info("Jawwal 3G Charging is in progress");
    return axios
      .post(
        `${BASE_API_URL}/jawwal_topup?number=${number}&cardtype=3g&language=${lang}&token=${token}&amount=0&pci=${data.jawwal3g.ID.substring(
          0,
          data.jawwal3g.ID.length - 4
        )}`
      )
      .then((res) => {
        if (res === "Failed") {
          Notiflix.Notify.failure("Jawwal 3G Charging is failed");
        } else {
          Notiflix.Notify.success("Jawwal 3G Charging is succeeded");
        }
      });
  }
  if (data.jawwalRom !== null && data.jawwalRom !== undefined) {
    console.log(data.jawwalRom.ID.substring(0, data.jawwalRom.ID.length - 4));
    Notiflix.Notify.info("Jawwal Roaming Charging is in progress");

    return axios
      .post(
        `${BASE_API_URL}/jawwal_topup?number=${number}&cardtype=rom&language=${lang}&token=${token}&amount=0&pci=${data.jawwalRom.ID.substring(
          0,
          data.jawwalRom.ID.length - 4
        )}`
      )
      .then((res) => {
        if (res === "Failed") {
          Notiflix.Notify.failure("Jawwal Roaming Charging is failed");
        } else {
          Notiflix.Notify.success("Jawwal Roaming Charging is succeeded");
        }
      });
  }
  if (data.jawwalCredit !== null && data.jawwalCredit !== undefined) {
    Notiflix.Notify.info("Charging is in progress");

    return axios
      .post(
        `${BASE_API_URL}/jawwal_topup?number=${number}&pci=0&cardtype=topup&language=${lang}&token=${token}&amount=${data.jawwalCredit.price}&pci=0`
      )
      .then((res) => {
        if (res === "Failed") {
          Notiflix.Notify.failure("Charging is failed");
        } else {
          Notiflix.Notify.success("Charging is succeeded");
        }
      });
  }
  if (data.jawwalMin !== null && data.jawwalMin !== undefined) {
    Notiflix.Notify.info("Jawwal Min Charging is in progress");
    console.log(data.jawwalMin.id.substring(0, data.jawwalMin.ID.length - 4));
    return axios
      .post(
        `${BASE_API_URL}/jawwal_topup?number=${number}&cardtype=min&language=${lang}&token=${token}&amount=0&pci=${data.jawwalMin.id.substring(
          0,
          data.jawwalMin.ID.length - 4
        )}`
      )
      .then((res) => {
        if (res === "Failed") {
          Notiflix.Notify.failure("Jawwal Min Charging is failed");
        } else {
          Notiflix.Notify.success("Jawwal Min Charging is succeeded");
        }
      });
  }
  localStorage.removeItem("JawwalMin");
  localStorage.removeItem("Jawwal3g");
  localStorage.removeItem("JawwalCredit");
  localStorage.removeItem("JawwalRom");
  pushHistory.push("/");
};

export const addChargeJawwal = (data) => (dispatch) => {
  dispatch(clearErrors());
  const chargeJal = JSON.parse(localStorage.chargeJawwal);
  console.log(typeof chargeJal, chargeJal);
  chargeJal.push(data);
  // dispatch({
  //   type: ADD_JAWWAL_CHARGE,
  //   payload: data,
  // });
  console.log(chargeJal);
  localStorage.setItem("chargeJawwal", JSON.stringify(chargeJal));
};

export const getChargeJawwal = () => (dispatch) => {
  dispatch(clearErrors());
  const charge = JSON.parse(localStorage.chargeJawwal);
  // console.log(typeof charge);
  dispatch({
    type: GET_JAWWAL_CHARGE,
    payload: charge,
  });
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

//OOREDOO
export const getOoredooMin = (mobileNo) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_MIN,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  axios
    .post(`${BASE_API_URL}/ooredoo_get_bundles?bundle=MIN&language=arabic`)
    .then((res) =>
      dispatch({
        type: GET_OOREDOO_MIN,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const getOoredooMinRenew = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_RENEW_MIN,
  });
};
export const getOoredooMinNotRenew = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_NOT_RENEW_MIN,
  });
};

export const getOoredoo3g = () => (dispatch) => {
  dispatch({
    type: GET_OOREDOO_3G,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/ooredoo_get_bundles?bundle=3G&language=arabic`)
    .then((res) =>
      dispatch({
        type: GET_OOREDOO_3G,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const getOoredoo3gRenew = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_RENEW_3G,
  });
};
export const getOoredoo3gNotRenew = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_NOT_RENEW_3G,
  });
};

export const getOoredooRom = () => (dispatch) => {
  dispatch({
    type: GET_OOREDOO_ROM,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/ooredoo_get_bundles?bundle=ROM&language=arabic`)
    .then((res) =>
      dispatch({
        type: GET_OOREDOO_ROM,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const getOoredooRomRenew = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_RENEW_ROM,
  });
};
export const getOoredooRomNotRenew = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_NOT_RENEW_ROM,
  });
};

export const getOoredooSuper = () => (dispatch) => {
  dispatch({
    type: GET_OOREDOO_SUPER,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/ooredoo_get_bundles?bundle=YOUTH&language=arabic`)
    .then((res) =>
      dispatch({
        type: GET_OOREDOO_SUPER,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};
export const getOoredooSuperRenew = (mobileNo) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_RENEW_OOREDOO_SUPER,
  });
};
export const getOoredooSuperNotRenew = (mobileNo) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_NOR_RENEW_OOREDOO_SUPER,
  });
};

export const chargeOoredoo = (history) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const mobile = history.location.pathname.split("/")[4];
  if (localStorage.ooredooCredit) {
    console.log(JSON.parse(localStorage.ooredooCredit).price, "priccce");
    const credit = JSON.parse(localStorage.ooredooCredit);
    Notiflix.Notify.info("Ooredoo  Charging is in progress");
    axios
      .post(
        `${BASE_API_URL}/ooredoo_topup?number=${mobile}&cardtype=topup&pci=0&language=${lang}&amount=${credit.price}&token=${token}`
      )
      .then((res) => {
        if (res === "Failed") {
          Notiflix.Notify.failure("Jawwal 3G Charging is failed");
        } else {
          Notiflix.Notify.success("Jawwal 3G Charging is succeeded");
        }
      });
  }
  if (localStorage.ooredoo3g) {
    console.log(localStorage.ooredoo3g);
    Notiflix.Notify.info("Jawwal Roaming Charging is in progress");
    const ooredoo3g = JSON.parse(localStorage.ooredoo3g);
    axios
      .post(
        `${BASE_API_URL}/ooredoo_topup?number=${mobile}&amount=1&cardtype=3G&pci=${ooredoo3g.bundleid}&language=${lang}&token=${token}`
      )
      .then((res) => {
        console.log(res, "resssss");
        if (res === "Failed") {
          Notiflix.Notify.failure("Jawwal Roaming Charging is failed");
        } else {
          Notiflix.Notify.success("Jawwal Roaming Charging is succeeded");
        }
      });
  }
  if (localStorage.ooredooMin) {
    Notiflix.Notify.info("Charging is in progress");
    console.log(localStorage.ooredooMin);
    const ooredooMin = JSON.parse(localStorage.ooredooMin);

    axios
      .post(
        `${BASE_API_URL}/ooredoo_topup?number=${mobile}&cardtype=min&pci=${ooredooMin.bundleid}&language=${lang}&amount=0&token=${token}`
      )
      .then((res) => {
        if (res === "Failed") {
          Notiflix.Notify.failure("Charging is failed");
        } else {
          Notiflix.Notify.success("Charging is succeeded");
        }
      });
  }
  if (localStorage.ooredooRom) {
    console.log(localStorage.ooredooRom);
    const ooredooRom = JSON.parse(localStorage.ooredooMin);

    Notiflix.Notify.info("Jawwal Min Charging is in progress");
    axios
      .post(
        `${BASE_API_URL}/ooredoo_topup?number=${mobile}&cardtype=rom&pci=0&language=${lang}&amount=10&token=${token}`
      )
      .then((res) => {
        if (res === "Failed") {
          Notiflix.Notify.failure("Jawwal Min Charging is failed");
        } else {
          Notiflix.Notify.success("Jawwal Min Charging is succeeded");
        }
      });
  }
  if (localStorage.ooredooSuper) {
    console.log(localStorage.ooredooRom);
    Notiflix.Notify.info("Jawwal ooredooSuper Charging is in progress");
    axios
      .post(
        `${BASE_API_URL}/ooredoo_topup?number=${mobile}&cardtype=rom&pci=0&language=${lang}&amount=10&token=${token}`
      )
      .then((res) => {
        if (res === "Failed") {
          Notiflix.Notify.failure("Jawwal Min Charging is failed");
        } else {
          Notiflix.Notify.success("Jawwal Min Charging is succeeded");
        }
      });
  }
  localStorage.removeItem("ooredooCredit");
  localStorage.removeItem("ooredoo3g");
  localStorage.removeItem("ooredooMin");
  localStorage.removeItem("ooredooRom");
  localStorage.removeItem("ooredooSuper");
  history.push("/");
};

// Group Companies
export const getGroupesData = (type) => (dispatch) => {
  dispatch({
    type: GET_GROUP_COMPANIES,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/peletalk_get_products?company=${type}&language=${lang}`)
    .then((res) =>
      dispatch({
        type: GET_GROUP_COMPANIES,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const chargeGrpupCompany = (type, mobile, data, history) => (dispatch) => {
  console.log(type, mobile, data, history, "type, mobile, data, history");
  const token = localStorage.jwtUserToken;

  dispatch(clearErrors());
  axios
    .post(
      `${BASE_API_URL}/${type}?number=${mobile}&pci=${data.PID}&language=${lang}&token=${token}`
    )
    .then((res) =>
      dispatch({
        type: GET_GROUP_COMPANIES,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
    // history.push('/')
};

//Hot && azy
export const getAzy = (mobile) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/azy_get_products?language=${lang}`)
    .then((res) =>
      dispatch({
        type: GET_AZY,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};
export const ChargeAzy = (mobile, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/peletalk_get_products?company=&language=${lang}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const getHot = (mobile, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/hot_get_products?language=${lang}`)
    .then((res) =>
      dispatch({
        type: GET_HOT,
        payload: res.data,
      })
    )
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const ChargeHot = (mobile, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/peletalk_get_products?company=&language=${lang}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) =>
      // console.log(err,'fffffff')
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};
