import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS, GET_USER_DATA } from "./types";
import jwt_decode from "jwt-decode";
import Notiflix from "notiflix";

const BASE_API_URL = process.env.REACT_APP_BASE_API;

export const setCurrentUser = (decode) => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  };
};

// login user

export const loginUser = (userData, pushNotificationUserId, ip, history) => (dispatch) => {
  dispatch(clearErrors());
  
  const config = {headers: {"X-Real-IP": ip, "X-Identifier": pushNotificationUserId }}
  return axios
    .post(`${BASE_API_URL}/signin?sellerid=${userData.userName}&pass=${userData.password}`, null, config)
    .then((res) => {
      //save to local storage
      if (res.data.status === "failed") {
        dispatch({
          type: GET_ERRORS,
          payload: "Invalid username or password",
        });
      } else {
        if (localStorage.cityCell) {
          const { token } = res.data;
          //set token to local storage
          localStorage.setItem("jwtUserToken", token);
          localStorage.setItem("companies", JSON.stringify(res.data));
          //set current user
          dispatch(setCurrentUser(res.data));
          history.push("/");
        } else {
          axios
            .post(`${BASE_API_URL}/verification?sellerid=${res.data.sellerid}`)
            .then((res) => {});
          history.push({
            pathname: `/verification/${res.data.sellerid}`,
            state: { mobile: res.data["mobile number"] },
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: "Something went wrong!",
      });
    });
};

export const verfiyUser = (userId, verfiyData, history) => (dispatch) => {
  dispatch(clearErrors());
  return axios
    .post(
      `${BASE_API_URL}/check_verification_code?vnumber=${verfiyData.virefy}&sellerid=${userId} `
    )
    .then((res) => {
      if (res.data.status === "failed! wrong verification code") {
        Notiflix.Notify.failure("Wronge confirmation code");
      } else {
        const { token } = res.data;
        localStorage.setItem("jwtUserToken", token);
        localStorage.setItem("companies", JSON.stringify(res.data));
        localStorage.setItem("cityCell", "cityCell");
        dispatch(setCurrentUser(res.data));
        history.push("/");
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: "Somthing went Wrong !!",
      });
    });
};

export const signUpUser = (userData, userName, pushNotificationUserId, ip, history) => (dispatch) => {
  dispatch(clearErrors());

  const config = {headers: {"X-Real-IP": ip, "X-Identifier": pushNotificationUserId }}
  return axios
    .post(
      `${BASE_API_URL}/signup?sellerid=${userName}&name=${userData.fullName}&passw=${
        userData.password
      }&country=${userData.country}&city=${userData.city}&address=${userData.address}&mobileNo=${
        userData.mobile
      }&email=${userData.email}${userData.code !== null ? `&code=${userData.code}` : null}`
    , null, config)
    .then((res) => {
      if ((typeof res.data === "string" && res.data.includes("failed")) || res.data.status === "failed") {
        dispatch({
          type: GET_ERRORS,
          payload: "Somthing went Wrong !!",
        });
      } else {
        const { token } = res.data;
        //set token to local storage
        localStorage.setItem("jwtUserToken", token);
        localStorage.setItem("cityCell", "cityCell");
        localStorage.setItem("companies", JSON.stringify(res.data));
        //set current user
        dispatch(setCurrentUser(res.data));
        history.push("/");
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: "Somthing went Wrong !!",
      });
    });
};

export const forgotPassword = (userData, history) => (dispatch) => {
  dispatch(clearErrors());

  return axios
    .post(`${BASE_API_URL}/forget_password?seller_id=${userData.userName}&mobile_last4=${userData.last4Digit}`)
    .then((res) => {
      if (res.data === "False" || res.data === "false" || res.data === "failed") {
        dispatch({
          type: GET_ERRORS,
          payload: "The provided information is wrong!",
        });
      } else {
        history.push({
          pathname: `/reset-password`,
          state: {
            sellerId: userData.userName,
            last4Digit: userData.last4Digit
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: "Something went wrong!",
      });
    });
};

export const resetPassword = (verfiyData, history) => (dispatch) => {
  dispatch(clearErrors());
  return axios
    .post(
      `${BASE_API_URL}/forget_password_verification?seller_id=${verfiyData.seller_id}&mobile_last4=${verfiyData.last_4_digit}&random_number=${verfiyData.random_number}&new_password=${verfiyData.password}`
    )
    .then((res) => {
      if (res.data === "False" || res.data === "false" || res.data === "failed") {
        dispatch({
          type: GET_ERRORS,
          payload: "The provided information is wrong!",
        });
      } else {
        history.push({
          pathname: "/signin",
          state: { password_changed: true },
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: "Something went wrong!",
      });
    });
};

export const callIpApi = () => {
  return axios.get("https://ipapi.co/json/");
};

export const userData = () => (dispatch) => {
  dispatch(clearErrors());
  const sallerId = JSON.parse(localStorage.companies).sellerid;
  axios
    .post(`${BASE_API_URL}/check_balance?sellerid=${sallerId}`)
    .then((res) => {
      dispatch({
        type: GET_USER_DATA,
        payload: res.data,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
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

// log user out
export const logoutUser = (router) => async (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtUserToken");
  localStorage.removeItem("companies");

  dispatch(setCurrentUser({}));
  setTimeout(router.push("/signin"), 1000);
};
