import axios from "axios";
import { GET_LAST_TRANSACTION, CLEAR_ERRORS, GET_ERRORS } from "./types";

const BASE_API_URL = process.env.REACT_APP_BASE_API;

export const getLastTransaction = () => (dispatch) => {
  dispatch(clearErrors());
  const sallerId = JSON.parse(localStorage.companies).sellerid;
  return axios
    .post(
      `${BASE_API_URL}/get_seller_transactions?sellerid=${sallerId}`
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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
