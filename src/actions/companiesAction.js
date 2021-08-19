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
import { logoutUser } from "./userAction";
import ApiRequest from "./ApiRequest";

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
    ApiRequest.post(`/JAB?number=${mobileNo.split("-").join("")}&bundle=3g&language=${lang}&refresh=${refresh}`)
    .then((res) => {
      dispatch({
        type: GET_JAWWAL_3G,
        payload: res.data,
      })
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
    ApiRequest.post(`JAB?number=${mobileNo.split("-").join("")}&bundle=rom&language=arabic&refresh=${refresh}`)
    .then((res) => {
      dispatch({
        type: GET_JAWWAL_ROM,
        payload: res.data,
      })
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

export const getJawwalCredit = (mobileNo) => (dispatch) => {
  dispatch(clearErrors());
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
  const number = history.split("/")[3];
  const promises = [];
  
  if (data.jawwalCredit.price < 10 ) {
    Notiflix.Notify.warning("اقل حد للشحن هو 10 شيكل", {
      className: "notiflix-notify pp-notiflix",
    });
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  if (data.jawwalCredit !== null && data.jawwalCredit !== undefined) {
    Notiflix.Notify.info("Charging is in progress");

    const promise = ApiRequest.post(
      `jawwal_topup?number=${number}&pci=0&cardtype=topup&language=${lang}&token=${token}&amount=${data.jawwalCredit.price}&pci=${data.jawwalCredit.id}`
    );
    promises.push(promise);
  }

  if (data.jawwal3g !== null && data.jawwal3g !== undefined) {
    Notiflix.Notify.info("Jawwal 3G Charging is in progress");
    const promise = ApiRequest.post(
      `jawwal_topup?number=${number}&cardtype=3g&language=${lang}&token=${token}&amount=0&pci=${data.jawwal3g.id}`
    );
    promises.push(promise);
  }

  if (data.jawwalRom !== null && data.jawwalRom !== undefined) {
    Notiflix.Notify.info("Jawwal Roaming Charging is in progress");

    const promise = ApiRequest.post(
      `jawwal_topup?number=${number}&cardtype=rom&language=${lang}&token=${token}&amount=0&pci=${data.jawwalRom.id}`
    );
    promises.push(promise);
  }

  if (data.jawwalMin !== null && data.jawwalMin !== undefined) {
    Notiflix.Notify.info("Jawwal Min Charging is in progress");

    const promise = ApiRequest.post(
      `jawwal_topup?number=${number}&cardtype=min&language=${lang}&token=${token}&amount=0&pci=${data.jawwalMin.id}`
    );
    promises.push(promise);
  }
  return Promise.all(promises).then((res) => {
    const isAuthFailed = res.some((result) => result.data == "failed, token error");

    if (isAuthFailed) {
      return logoutUser(pushHistory)
    }

    localStorage.removeItem("JawwalMin");
    localStorage.removeItem("Jawwal3g");
    localStorage.removeItem("JawwalCredit");
    localStorage.removeItem("JawwalRom");
    pushHistory.push("/");
  });
};

export const addChargeJawwal = (data) => (dispatch) => {
  dispatch(clearErrors());
  const chargeJal = JSON.parse(localStorage.chargeJawwal);
  chargeJal.push(data);
  localStorage.setItem("chargeJawwal", JSON.stringify(chargeJal));
};

export const getChargeJawwal = () => (dispatch) => {
  dispatch(clearErrors());
  const charge = JSON.parse(localStorage.chargeJawwal);
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
export const getOoredooMin = (mobileNo, refresh = false) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_MIN,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });

  const storageHash = sha256(`N${mobileNo}TooredooMin`).toString();
  const ooredooMin = JSON.parse(localStorage.getItem(storageHash));
  if (!refresh && ooredooMin) {
    dispatch({
      type: GET_OOREDOO_MIN,
      payload: ooredooMin,
    });
  } else {
    ApiRequest
    .post(`ooredoo_get_bundles?bundle=MIN&language=arabic`)
    .then((res) => {
      dispatch({
        type: GET_OOREDOO_MIN,
        payload: res.data,
      });
      localStorage.setItem(storageHash, JSON.stringify(res.data));
    }).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  }
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

export const getOoredoo3g = (refresh = false) => (dispatch) => {
  dispatch({
    type: GET_OOREDOO_3G,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch(clearErrors());

  const storageHash = sha256(`NallTooredoo3G`).toString();
  const ooredoo3g = JSON.parse(localStorage.getItem(storageHash));
  if (!refresh && ooredoo3g) {
    dispatch({
      type: GET_OOREDOO_3G,
      payload: ooredoo3g,
    });
  } else {
    ApiRequest
    .post(`ooredoo_get_bundles?bundle=3G&language=arabic`)
    .then((res) =>{
      dispatch({
        type: GET_OOREDOO_3G,
        payload: res.data,
      })
      localStorage.setItem(storageHash, JSON.stringify(res.data))
    }).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  }
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

export const getOoredooRom = (refresh = false) => (dispatch) => {
  dispatch({
    type: GET_OOREDOO_ROM,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch(clearErrors());

  const storageHash = sha256(`NallTooredooRom`).toString();
  const ooredooRom = JSON.parse(localStorage.getItem(storageHash));
  if (!refresh && ooredooRom) {
    dispatch({
      type: GET_OOREDOO_ROM,
      payload: ooredooRom,
    });
  } else {
    ApiRequest
    .post(`ooredoo_get_bundles?bundle=ROM&language=arabic`)
    .then((res) => {
      dispatch({
        type: GET_OOREDOO_ROM,
        payload: res.data,
      })
      localStorage.setItem(storageHash, JSON.stringify(res.data))
    }).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  }
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

export const getOoredooSuper = (refresh = false) => (dispatch) => {
  dispatch({
    type: GET_OOREDOO_SUPER,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch(clearErrors());

  const storageHash = sha256(`NallTooredooSuper`).toString();
  const ooredooSuper = JSON.parse(localStorage.getItem(storageHash));
  if (!refresh && ooredooSuper) {
    dispatch({
      type: GET_OOREDOO_SUPER,
      payload: ooredooSuper,
    });
  } else {
    ApiRequest
    .post(`ooredoo_get_bundles?bundle=YOUTH&language=arabic`)
    .then((res) => {
      dispatch({
        type: GET_OOREDOO_SUPER,
        payload: res.data,
      })
      localStorage.setItem(storageHash, JSON.stringify(res.data))
    }).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  }
};

export const getOoredooSuperRenew = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_RENEW_OOREDOO_SUPER,
  });
};
export const getOoredooSuperNotRenew = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_NOR_RENEW_OOREDOO_SUPER,
  });
};

export const chargeOoredoo = (data, history, pushHistory) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const number = history.split("/")[4];
  const promises = [];
  
  if (data.ooredoo3g !== null && data.ooredoo3g !== undefined) {
    Notiflix.Notify.info("ooredoo 3G Charging is in progress");
    const promise = ApiRequest.post(
      `ooredoo_topup?number=${number}&cardtype=3g&language=${lang}&token=${token}&amount=0&pci=${data.ooredoo3g.bundleid}`
    );
    promises.push(promise);
  }
  if (data.ooredooRom !== null && data.ooredooRom !== undefined) {
    Notiflix.Notify.info("ooredoo Roaming Charging is in progress");

    const promise = ApiRequest.post(
      `ooredoo_topup?number=${number}&cardtype=rom&language=${lang}&token=${token}&amount=0&pci=${data.ooredooRom.bundleid}`
    );
    promises.push(promise);
  }
  if (data.ooredooCredit !== null && data.ooredooCredit !== undefined) {
    Notiflix.Notify.info("Charging is in progress");

    const promise = ApiRequest.post(
      `ooredoo_topup?number=${number}&pci=0&cardtype=topup&language=${lang}&token=${token}&amount=${data.ooredooCredit.price}&pci=${data.ooredooCredit.id}`
    );
    promises.push(promise);
  }
  if (data.ooredooMin !== null && data.ooredooMin !== undefined) {
    Notiflix.Notify.info("ooredoo Min Charging is in progress");
    const promise = ApiRequest.post(
      `ooredoo_topup?number=${number}&cardtype=min&language=${lang}&token=${token}&amount=0&pci=${data.ooredooMin.bundleid}`
    );
    promises.push(promise);
  }
  if (data.ooredooSuper !== null && data.ooredooSuper !== undefined) {
    Notiflix.Notify.info("Jawwal ooredooSuper Charging is in progress");
    const promise = ApiRequest.post(
      `ooredoo_topup?number=${number}&cardtype=super&language=${lang}&token=${token}&amount=0&pci=${data.ooredooRom.bundleid}`
    );
    promises.push(promise);
  }
  
  return Promise.all(promises).then((res) => {
    const isAuthFailed = res.some((result) => result.data == "failed, token error");

    if (isAuthFailed) {
      return logoutUser(pushHistory)
    }

    localStorage.removeItem("ooredooMin");
    localStorage.removeItem("ooredoo3g");
    localStorage.removeItem("ooredooCredit");
    localStorage.removeItem("ooredooRom");
    localStorage.removeItem("ooredooSuper");
    pushHistory.push("/");
  });
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
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const chargeGrpupCompany = (type, mobile, data, history) => (dispatch) => {
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
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
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
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};
