import { GET_LAST_TRANSACTION, GET_SELLER_POINTS, CLEAR_ERRORS, GET_ERRORS } from "./types";
import ApiRequest from "./ApiRequest";
import { LOCALES_COUNTRIES } from "../i18n";

export const getSellerPoints = (lang, from_date, to_date) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}
  const sellerId = JSON.parse(localStorage.companies).sellerid
  
  return  ApiRequest
    .post(
      `seller_points?from_date=${from_date}&to_date=${to_date}&sellerid=${sellerId}`, null, config
    )
    .then((res) => {
      console.log(res, 'errorrrr');

      dispatch({
        type: GET_SELLER_POINTS,
        payload: res.data,
      });
      // return res
    })
    .catch((err) => {
      console.log(err, 'errorrrr');
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Somthing went Wrong !!",
      // });
    });
};

export const getLastTransaction = () => (dispatch) => {
  dispatch(clearErrors());
  const sallerId = JSON.parse(localStorage.companies).sellerid;
  return ApiRequest
    .post(
      `get_seller_transactions?sellerid=${sallerId}`
    )
    .then((res) => {
      dispatch({
        type: GET_LAST_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: "Somthing went Wrong !!",
      });
    });
};

export const showTransctionDetails = (tran_id, lang) => {
  return new Promise((resolve, reject) => {
    ApiRequest.post(`get_tranaction_status?trand_no=${tran_id}&lang=${lang}`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

export const cancelTransction = (tran_id, cnumber) => {
 
  const language = localStorage.langCity || LOCALES_COUNTRIES[process.env.REACT_APP_DEFAULT_LANG]
  return new Promise((resolve, reject) => {
    ApiRequest.post(`peletalk_cancelation?transid=${tran_id}&cnumber=${cnumber}&language=${language}`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
