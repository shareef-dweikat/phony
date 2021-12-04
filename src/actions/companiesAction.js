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
import { logoutUser } from "./userAction";
import ApiRequest from "./ApiRequest";
import Toast from "../components/common/Toast";
import { isEmpty, isNil } from "lodash";
import { intl } from "../i18n/provider";
import { AVALIABLE_LANGUAGES } from "../i18n/locales";

const lang = AVALIABLE_LANGUAGES[intl.locale];
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
  console.log('dddddccccccc')
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
    ApiRequest.post(`JAB?number=${mobileNo.split("-").join("")}&bundle=rom&language=${lang}&refresh=${refresh}`)
    .then((res) => {
      console.log(res, "bacckkres")
      dispatch({
        type: GET_JAWWAL_ROM,
        payload: res.data,
      })
      localStorage.setItem(storageHash, JSON.stringify(res.data));
    })
    .catch((err) =>
    console.log(err, "bacckkererrrres")

      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err,
      // })
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
  const number = history.split("/")[3];
  const promises = [];
  
  if (!isNil(data.jawwalCredit)) {
    if (data.jawwalCredit.price < 10 ) {
      Toast.fire({
        title: intl.formatMessage({id: "The minimum credit is 10 NIS"}),
        icon: "warning",
      });
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  
    const promise = ApiRequest.post(
      `jawwal_topup?number=${number}&pci=0&cardtype=topup&language=${lang}&amount=${data.jawwalCredit.price}&pci=${data.jawwalCredit.id}`
    );
    promises.push(promise);
  }

  if (!isNil(data.jawwal3g)) {
    const promise = ApiRequest.post(
      `jawwal_3g?number=${number}&cardtype=3g&language=${lang}&amount=0&pci=${data.jawwal3g.id}`
    );
    promises.push(promise);
  }

  if (!isNil(data.jawwalRom)) {
    const promise = ApiRequest.post(
      `jawwal_3g?number=${number}&cardtype=rom&language=${lang}&amount=0&pci=${data.jawwalRom.id}`
    );
    promises.push(promise);
  }

  if (!isNil(data.jawwalMin)) {
    const promise = ApiRequest.post(
      `jawwal_3g?number=${number}&cardtype=min&language=${lang}&amount=0&pci=${data.jawwalMin.id}`
    );
    promises.push(promise);
  }

  return Promise.all(promises)
  .then((res) => {
    const isAuthFailed = res.some((result) => result.data == "failed, token error" || result.data.reason == "token expired");
    if (isAuthFailed) {
      Toast.fire({
        title: intl.formatMessage({id: "You must log in again!"}),
        icon: "error",
      });
      return logoutUser(pushHistory)
    }
    
    const noBalance = res.some((result) => result.data.reason == "seller no balance");
    if (noBalance) {
      Toast.fire({
        title: intl.formatMessage({id: "No balance available"}),
        icon: "warning",
      });
      return;
    }

    const isFailed = res.some((result) => result.data.status == "failed");
    if (isFailed) {
      const erros = [];
      res.forEach((result) => {
        if (result.data.status === "failed") {
          erros.push(result.data.reason);
        }
      });
      if (!isEmpty(erros)) {
        Toast.fire({
          title: erros.join("\n"),
          icon: "warning",
        });  
      }
      return;
    }

    Toast.fire({
      title: intl.formatMessage({id: "Your request is in progress"}),
      icon: "succuss",
    });

    clearJawwalSelected();
    pushHistory.push("/?refresh=true");
  });
};

const clearJawwalSelected = () => {
  localStorage.removeItem("JawwalMin");
  localStorage.removeItem("Jawwal3g");
  localStorage.removeItem("JawwalCredit");
  localStorage.removeItem("JawwalRom");
}

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
export const getOoredooMin = (refresh = false) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: GET_OOREDOO_MIN,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });

  const storageHash = sha256(`NallTooredooMin`).toString();
  const ooredooMin = JSON.parse(localStorage.getItem(storageHash));
  if (!refresh && ooredooMin) {
    dispatch({
      type: GET_OOREDOO_MIN,
      payload: ooredooMin,
    });
  } else {
    ApiRequest
    .post(`ooredoo_get_bundles?bundle=MIN&language=${lang}`)
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
    .post(`ooredoo_get_bundles?bundle=3G&language=${lang}`)
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
    .post(`ooredoo_get_bundles?bundle=ROM&language=${lang}`)
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
    .post(`ooredoo_get_bundles?bundle=YOUTH&language=${lang}`)
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
  const number = history.split("/")[4];
  const promises = [];

  if (!isNil(data.ooredooCredit)) {
    if (data.ooredooCredit.price < 10 ) {
      Toast.fire({
        title: intl.formatMessage({id: "The minimum credit is 10 NIS"}),
        icon: "warning",
      });
      return new Promise((resolve, reject) => {
        reject();
      });
    }
    const promise = ApiRequest.post(
      `ooredoo_topup?number=${number}&pci=0&cardtype=topup&language=${lang}&amount=${data.ooredooCredit.price}&pci=${data.ooredooCredit.id}`
    );
    promises.push(promise);
  }
  if (!isNil(data.ooredoo3g)) {
    const promise = ApiRequest.post(
      `ooredoo_3g?number=${number}&cardtype=3g&language=${lang}&amount=0&pci=${data.ooredoo3g.bundleid}`
    );
    promises.push(promise);
  }
  if (!isNil(data.ooredooRom)) {
    const promise = ApiRequest.post(
      `ooredoo_3g?number=${number}&cardtype=rom&language=${lang}&amount=0&pci=${data.ooredooRom.bundleid}`
    );
    promises.push(promise);
  }
  if (!isNil(data.ooredooMin)) {
    const promise = ApiRequest.post(
      `ooredoo_3g?number=${number}&cardtype=min&language=${lang}&amount=0&pci=${data.ooredooMin.bundleid}`
    );
    promises.push(promise);
  }
  if (!isNil(data.ooredooSuper)) {
    const promise = ApiRequest.post(
      `ooredoo_3g?number=${number}&cardtype=super&language=${lang}&amount=0&pci=${data.ooredooSuper.bundleid}`
    );
    promises.push(promise);
  }
  
  return Promise.all(promises)
  .then((res) => {
    const isAuthFailed = res.some((result) => result.data == "failed, token error" || result.data.reason == "token expired");
    if (isAuthFailed) {
      Toast.fire({
        title: intl.formatMessage({id: "You must log in again!"}),
        icon: "error",
      });
      return logoutUser(pushHistory)
    }
    
    const noBalance = res.some((result) => result.data.reason == "seller no balance");
    if (noBalance) {
      Toast.fire({
        title: intl.formatMessage({id: "No balance available"}),
        icon: "warning",
      });
      return;
    }

    const isFailed = res.some((result) => result.data.status == "failed");
    if (isFailed) {
      const erros = [];
      res.forEach((result) => {
        if (result.data.status === "failed") {
          erros.push(result.data.reason);
        }
      });
      if (!isEmpty(erros)) {
        Toast.fire({
          title: erros.join("\n"),
          icon: "warning",
        });  
      }
      return;
    }

    Toast.fire({
      title: intl.formatMessage({id: "Your request is in progress"}),
      icon: "succuss",
    });

    clearOoredooSelected();
    pushHistory.push("/?refresh=true");
  });
};

const clearOoredooSelected = () => {
  localStorage.removeItem("ooredooMin");
  localStorage.removeItem("ooredoo3g");
  localStorage.removeItem("ooredooCredit");
  localStorage.removeItem("ooredooRom");
  localStorage.removeItem("ooredooSuper");
}

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
  const company = type === "mobile012" ? "012mobile" : type;

  return axios
    .post(`${BASE_API_URL}/peletalk_get_products?company=${company}&language=${lang}`)
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
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const company = type === "mobile012" ? "012mobile" : type;
  const amount = company ==='partner'?data.amount:''
  return ApiRequest.post(`${company}?number=${mobile}&pci=${data.PID}&language=${lang}&token=${token}&amount=${amount}`)
  .then((res) => {
    if (res.data == "failed, token error" || res.data.reason == "token expired") {
      Toast.fire({
        title: intl.formatMessage({id: "You must log in again!"}),
        icon: "error",
      });
      return logoutUser(history)
    }
    
    if (res.data.reason == "seller no balance") {
      Toast.fire({
        title: intl.formatMessage({id: "No balance available"}),
        icon: "warning",
      });
      return;
    }

    if (res.data.status == "failed") {
      Toast.fire({
        title: res.data.reason,
        icon: "warning",
      });
      return;
    }

    Toast.fire({
      title: intl.formatMessage({id: "Your request is in progress"}),
      icon: "succuss",
    });
  })
  .catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err,
    })
  );
};

//Hot && azy
export const getAzy = (mobile) => (dispatch) => {
  dispatch({
    type: GET_AZY,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
  dispatch(clearErrors());
  ApiRequest.post(`azy_get_products?language=${lang}`)
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
export const ChargeAzy = (mobile, selected, history) => (dispatch) => {
  dispatch(clearErrors());
  return ApiRequest.post(`peletalk_get_products?company=&language=${lang}`)
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
  dispatch({
    type: GET_HOT,
    payload: [],
  });
  dispatch({
    type: LOADING_TRUE,
  });
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
  return axios
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
