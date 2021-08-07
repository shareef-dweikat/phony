import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS, GET_USER_DATA } from "./types";
import jwt_decode from "jwt-decode";
import Notiflix from "notiflix";

export const setCurrentUser = (decode) => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  };
};

// login user

export const loginUser = (userData, history) => (dispatch) => {
  dispatch(clearErrors());

  return axios
    .post(`http://api.phoneplay.me/api/v1/resources/signin?sellerid=${userData.userName}&pass=${userData.password}`)
    .then((res) => {
      //save to local storage

      console.log(res.data.status);
      // const decode = jwt_decode(res.data.token);
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
          console.log(res.data.sellerid, "data", localStorage.cityCell, res.data["mobile number"]);
          axios
            .post(`http://api.phoneplay.me/api/v1/resources/verification?sellerid=${res.data.sellerid}`)
            .then((res) => {});
          history.push({
            pathname: `/Verification/${res.data.sellerid}`,
            state: { mobile: res.data["mobile number"] },
          });
        }
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

export const verfiyUser = (userId, verfiyData, history) => (dispatch) => {
  dispatch(clearErrors());
  return axios
    .post(
      `http://api.phoneplay.me/api/v1/resources/check_verification_code?vnumber=${verfiyData.virefy}&sellerid=${userId} `
    )
    .then((res) => {
      console.log(res, "resresresresresresres");
      if (res.data.status === "failed! wrong verification code") {
        Notiflix.Notify.failure("Wronge confirmation code");
      } else {
        console.log(res.data, "res=>>>>>");
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

export const signUpUser = (userData, userName, history) => (dispatch) => {
  dispatch(clearErrors());
  return axios
    .post(
      `http://api.phoneplay.me/api/v1/resources/signup?sellerid=${userName}&name=${userData.fullName}&passw=${
        userData.password
      }&country=${userData.country}&city=${userData.city}&address=${userData.address}&mobileNo=${
        userData.mobile
      }&email=${userData.email}${userData.code !== null ? `&code=${userData.code}` : null}`
    )
    .then((res) => {
      if (res.data.status === "failed") {
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

export const userData = () => (dispatch) => {
  dispatch(clearErrors());
  const sallerId = JSON.parse(localStorage.companies).sellerid;
  axios
    .post(`http://api.phoneplay.me/api/v1/resources/check_balance?sellerid=${sallerId}`)
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
