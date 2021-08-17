import { GET_LAST_TRANSACTION, CLEAR_ERRORS, GET_ERRORS } from "./types";
import ApiRequest from "./ApiRequest";

export const getLastTransaction = () => (dispatch) => {
  dispatch(clearErrors());
  const sallerId = JSON.parse(localStorage.companies).sellerid;
  return ApiRequest
    .post(
      `get_seller_transactions?sellerid=${sallerId}`
    )
    .then((res) => {
      console.log(res.data);
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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
