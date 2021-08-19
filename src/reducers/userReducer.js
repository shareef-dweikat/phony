import { SET_CURRENT_USER, GET_USER_DATA } from "../actions/types";
import isEmpty from "./../validation/is_empty";
import setRequestHeader from "../components/common/setRequestHeader";

const initialState = {
  isAuthenticated: false,
  user: null,
  userData: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log("SET_CURRENT_USER", action.payload);
      if (action.payload?.token) {
        setRequestHeader("token", action.payload.token);
      }
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}
