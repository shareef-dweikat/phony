import { CLEAR_ERRORS, GET_ERRORS } from "./../actions/types";
const initialState = {
  massage: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        massage: action.payload,
      };
    default:
      return state;
    case CLEAR_ERRORS:
      return {};
  }
}
