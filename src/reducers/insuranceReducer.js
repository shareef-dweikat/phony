import {
  GET_INSURANCES,
} from "../actions/types";
const initialState = {
  list: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INSURANCES:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
