import {
  GET_SELLER_DISCOUNTS
} from "../actions/types";
const initialState = {
  discounts: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SELLER_DISCOUNTS:
      return {
        ...state,
        discounts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
