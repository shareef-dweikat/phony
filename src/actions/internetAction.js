import { GET_INTERNETS, CLEAR_ERRORS, GET_ERRORS } from "./types";
import ApiRequest from "./ApiRequest";
import sha256 from 'crypto-js/sha256';

export const getInternts = (lang) => (dispatch) => {
  dispatch(clearErrors());

  return new Promise((resolve, reject) => {
    const storageHash = sha256(`internet_${lang}`).toString();
    const internets = JSON.parse(sessionStorage.getItem(storageHash));
    if (internets) {
      dispatch({
        type: GET_INTERNETS,
        payload: internets,
      });
      resolve(true);
    } else {
      return ApiRequest
        .post(`internet?language=${lang}`)
        .then((res) => {
          dispatch({
            type: GET_INTERNETS,
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
