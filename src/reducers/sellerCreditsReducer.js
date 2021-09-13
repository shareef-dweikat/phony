import {
  ADD_SELLER_CREDITS,
  GET_SELLER_CREDITS
} from "../actions/types";
const initialState = {
  discounts: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SELLER_CREDITS:
      console.log('ADD_SELLER_CREDITS', action.payload)
      return {
        ...state,
        // credits: action.payload,
        loading: false,
      };
      case GET_SELLER_CREDITS:
        console.log('GET_SELLER_CREDITS', action.payload)
        return {
          ...state,
          credits: action.payload,
          loading: false,
        };
    default:
      return state;
  }
}
