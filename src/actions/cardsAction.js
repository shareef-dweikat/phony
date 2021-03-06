import axios from "axios";
import { GET_CARDS, CLEAR_ERRORS, GET_ERRORS, GET_COPMANY_CARDS } from "./types";

const BASE_API_URL = process.env.REACT_APP_BASE_API;

export const getCards = () => (dispatch) => {
  const token = localStorage.jwtUserToken;
  dispatch(clearErrors());
  return axios
    .post(`${BASE_API_URL}/get_cards?token=${token}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_CARDS,
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

export const getCompanyCards = () => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`${BASE_API_URL}/get_cards`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_COPMANY_CARDS,
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
