import { 
  GET_SELLER_DISCOUNTS,
  CLEAR_ERRORS,
   } from "./types";
import ApiRequest from "./ApiRequest";
import { LOCALES_COUNTRIES } from "../i18n";

export const getDiscounts = () => (dispatch) => {
  dispatch(clearErrors());
  const token = localStorage.jwtUserToken;
  const config = {headers: {"token": token, "Access-Control-Allow-Origin": "http://localhost:8080"}}  
  return ApiRequest
    .post(
      `seller_discount`, null, config
    )
    .then((res) => {
      console.log(res, 'seller_discount');
      const discounts = res.data 
      dispatch({
        type: GET_SELLER_DISCOUNTS,
        payload: discounts,
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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
