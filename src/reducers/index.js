import { combineReducers } from "redux";

import authReducer from "./userReducer";
import companiesReducer from "./companiesReducer";
import errorReducer from "./errorReducer";
import reportReducer from "./reportsReducer";
import insuranceReducer from "./insuranceReducer";
import internetReducer from "./internetReducer"
import discountsReducer from "./discountsReducer"
import sellerCreditsReducer from './sellerCreditsReducer'
import cardReducer from "./cards";
export default combineReducers({
  auth: authReducer,
  companies: companiesReducer,
  error: errorReducer,
  reports: reportReducer,
  cards: cardReducer,
  insurances: insuranceReducer,
  internets: internetReducer,
  discounts: discountsReducer,
  credits: sellerCreditsReducer
});
