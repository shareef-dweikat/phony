import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_LAST_TRANSACTION,
} from "../actions/types";
const initialState = {
  lastTransaction: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LAST_TRANSACTION:
      return {
        ...state,
        lastTransaction: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
