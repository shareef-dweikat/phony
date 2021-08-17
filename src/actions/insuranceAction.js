import { GET_INSURANCES, CLEAR_ERRORS, GET_ERRORS } from "./types";
import ApiRequest from "./ApiRequest";
import sha256 from 'crypto-js/sha256';

export const getInsurances = (lang) => (dispatch) => {
  dispatch(clearErrors());
  return new Promise((resolve, reject) => {
    const storageHash = sha256(`insurance_${lang}`).toString();
    const insurances = JSON.parse(sessionStorage.getItem(storageHash));
    if (insurances) {
      dispatch({
        type: GET_INSURANCES,
        payload: insurances,
      });
      resolve(true);
    } else {
      return ApiRequest
        .post(`insurance?language=${lang}`)
        .then((res) => {
          dispatch({
            type: GET_INSURANCES,
            payload: res.data,
          });
          sessionStorage.setItem(storageHash, JSON.stringify(res.data));
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: GET_ERRORS,
            payload: "Something went wrong !!",
          });
          reject(false);
        });
    }
  })
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
