import { 
  GET_SELLER_REPORTS,
  GET_LAST_TRANSACTION,
  GET_SELLER_POINTS, 
  CLEAR_ERRORS,
  GET_SELLER_CANCELATION_REPORTS,
  GET_ERRORS,
  GET_SELLER_PROFIT,
  GET_SELLER_RUNNING_REPORTS
   } from "./types";
import ApiRequest from "./ApiRequest";
import { LOCALES_COUNTRIES } from "../i18n";


export const getSellerRunningReports = (from_date, to_date, phone = '', transType = '', transStatus = '') => (dispatch) => {
  transStatus = transStatus === 'All'?'':transStatus
  transType = transType === 'All'?'':transType
  console.log(from_date, to_date)
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}
  const sellerId = JSON.parse(localStorage.companies).sellerid
  return  ApiRequest
    .post(
      `get_seller_report?from_date=${from_date}&to_date=${to_date}&sellerid=${sellerId}&trans_status=${transStatus}&trans_type=${transType}&number=${phone}`, null, config
    )
    .then((res) => {
      console.log(res, 'GET_SELLER_RUNNING_REPORTS');
      dispatch({
        type: GET_SELLER_RUNNING_REPORTS,
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
export const getSellerPoints = (lang, from_date, to_date) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}
  const sellerId = JSON.parse(localStorage.companies).sellerid
  console.log(from_date, to_date)
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
export const getSellerCancelationReports = (from_date, to_date, phone = '', transType = '', transStatus = '') => (dispatch) => {
  transStatus = transStatus === 'All'?'':transStatus
  transType = transType === 'All'?'':transType

  console.log(from_date, to_date, phone, transType, transStatus, "Params")
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}
  const sellerId = JSON.parse(localStorage.companies).sellerid
  return  ApiRequest
    .post(
      `get_seller_report?from_date=${from_date}&to_date=${to_date}&sellerid=${sellerId}&trans_status=${transStatus}&trans_type=${transType}&number=${phone}&&canceled=true`, null, config
    )
    .then((res) => {
      console.log(res, 'GET_SELLER_CANCELATION_REPORTS');
      dispatch({
        type: GET_SELLER_CANCELATION_REPORTS,
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

export const getSellerReports = (
    from_date, 
    to_date, phone = '',
    transType = '', 
    transStatus = '',
    transId= '',
    cardId= '',
    cancelRequest= '',
    canceled= '',
    amount= '',
    renew= '',
    provider= '',
  ) => (dispatch) => {
  transStatus = transStatus === 'All' || transStatus === undefined?'':transStatus
  transType = transType === 'All'  || transType === undefined?'':transType
  provider = provider === 'All' || provider === undefined? '':provider
  console.log(
      from_date, 
      to_date, 
      phone, 
      transType, 
      transStatus,
      transId,
      cardId,
      cancelRequest,
      canceled,
      amount,
      renew,
      provider,
      "Params"
    )

  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}
  const sellerId = JSON.parse(localStorage.companies).sellerid
  return  ApiRequest
    .post(
      `get_seller_report?from_date=${from_date}&to_date=${to_date}&cancelRequest=${cancelRequest}&sellerid=${sellerId}&cardId=${cardId}&amount=${amount}&canceled=${canceled}&trans_id=${transId}&autorenew=${renew}&trans_status=${transStatus}&trans_type=${transType}&number=${phone}&provider=${provider}`, null, config
    )
    .then((res) => {
      console.log(res, 'GET_SELLER_REPORTS');
      dispatch({
        type: GET_SELLER_REPORTS,
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

export const getSellerProfit = (from_date, to_date) => (dispatch) => {
  console.log(from_date, to_date, "ddddreeee")
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}
  const sellerId = JSON.parse(localStorage.companies).sellerid
  return  ApiRequest
    .post(
      `get_seller_profit_report?from_date=${from_date}&to_date=${to_date}&sellerid=${sellerId}`, null, config
    )
    .then((res) => {
      console.log(res, 'get_seller_profit_report');
      dispatch({
        type: GET_SELLER_PROFIT,
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
