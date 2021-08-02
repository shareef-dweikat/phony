import { combineReducers } from "redux";

import authReducer from "./userReducer";
import companiesReducer from "./companiesReducer";
import errorReducer from "./errorReducer";
import reportReducer from "./reportsReducer";
import cardReducer from "./cards";
export default combineReducers({
  auth: authReducer,
  companies: companiesReducer,
  error: errorReducer,
  reports: reportReducer,
  cards: cardReducer,
});
