import { 
  GET_SELLER_CREDITS,
  CLEAR_ERRORS,
  ADD_SELLER_CREDITS,
  GET_SELLERS,
  GET_REWARDS,
  CONVERT_POINTS
   } from "./types";
import ApiRequest from "./ApiRequest";
import { intl } from "../i18n/provider";
import Toast from "../components/common/Toast";

export const addSellerCredit = (amount, sellerId) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const sellerId = JSON.parse(localStorage.companies).sellerid
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}  
  return ApiRequest
    .post(
      `seller_add_credits?amount=${amount}&sellerid=${sellerId}`, null, config
    )
    .then((res) => {
      const credits = res.data 
      if(credits.status === 'false') {
        Toast.fire({
          title: intl.formatMessage({id: "Operation add credit failed"}),
          icon: "error",
        });
      } else {
        Toast.fire({
          title: intl.formatMessage({id: "Operation add credit was successfully performed"}),
          icon: "succuss",
        });
      }
      dispatch({
        type: ADD_SELLER_CREDITS,
        payload: credits,
      });
    })
    .catch((err) => {
      console.log(err, 'errorrrr');
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Somthing went Wrong !!",
      // });
    });
};

export const getSellerBalance = (sellerId) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}  
  return ApiRequest
    .post(
      `get_seller_balance?&sellerid=${sellerId}`, null, config
    )
    .then((res) => {
      const credits = res.data 
      dispatch({
        type: GET_SELLER_CREDITS,
        payload: credits,
      });
    })
    .catch((err) => {
      console.log(err, 'errorrrr');
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Somthing went Wrong !!",
      // });
    });
};

export const getSellers = () => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}  
  return ApiRequest
    .post(
      `get_allseller`, null, config
    )
    .then((res) => {
      const sellers = res.data 
      dispatch({
        type: GET_SELLERS,
        payload: sellers,
      });
    })
    .catch((err) => {
      console.log(err, 'errorrrr');
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Somthing went Wrong !!",
      // });
    });
};

export const getRewards = () => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}  
  return ApiRequest
    .post(
      `get_rewards`, null, config
    )
    .then((res) => {
      const sellers = res.data 
      dispatch({
        type: GET_REWARDS,
        payload: sellers,
      });
    })
    .catch((err) => {
      console.log(err, 'errorrrr');
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Somthing went Wrong !!",
      // });
    });
};

export const convertPoints = (id, bank, accountNumber, amount) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}} 
  const sellerId = JSON.parse(localStorage.companies).sellerid

   //bank_name=${bank}&account_no=${accountNumber}&seller_id=${sellerId}&amount=${amount}
  //    `convert_points?reward_id=${id}&amount=${amount}`, null, config

  //`convert_points?reward_id=${id}bank_name=${bank}&account_no=${accountNumber}&seller_id=${sellerId}&amount=${amount}`

  //bank_name=${bank}&account_no=${accountNumber}&seller_id=${sellerId}&amount=${amount}
  //    `convert_points?reward_id=${id}&amount=${amount}`, null, config
  
  //bank_name=${bank}&account_no=${accountNumber}&seller_id=${sellerId}&amount=${amount}
  amount = amount?amount:''
  accountNumber = accountNumber?accountNumber: ''
  bank = bank? bank:''
  return ApiRequest
    .post(
      `convert_points?reward_id=${id}&bank_name=${bank}&account_no=${accountNumber}&seller_id=${sellerId}&amount=${amount}`, null, config
    )
    .then((res) => {
      const sellers = res.data 
      dispatch({
        type: CONVERT_POINTS,
        payload: sellers,
      });
      if(res.data.status === "success")
        Toast.fire({
          title: intl.formatMessage({id: "success"}),
          icon: "success",
          showConfirmButton: true,
        })
      return res
    })
    .catch((err) => {
      console.log(err, 'errorrrr');
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Somthing went Wrong !!",
      // });
    });
};

export const convertPointsToCash = (bank, accountNumber, amount) => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}  
  const sellerId = JSON.parse(localStorage.companies).sellerid
  return ApiRequest
    .post(
      `bank_transfer_details?bank_name=${bank}&account_no=${accountNumber}&seller_id=${sellerId}&amount=${amount}`, null, config
    )
    .then((res) => {
    //  const sellers = res.data 
      // dispatch({
      //   type: CONVERT_POINTS,
      //   payload: sellers,
      // });
      if(res.data.status=="success")
        Toast.fire({
          title: intl.formatMessage({id: "Operation was successfully performed"}),
          icon: "alert",
          showConfirmButton: true,
        })
    })
    .catch((err) => {
      console.log(err, 'errorrrr');
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: "Somthing went Wrong !!",
      // });
    });
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
