import {
  ADD_SELLER_CREDITS,
  GET_SELLERS,
  GET_SELLER_CREDITS,
  GET_REWARDS,
  CONVERT_POINTS
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
      case GET_REWARDS:
        console.log('GET_REWARDS', action.payload)
        return {
          ...state,
          rewards: action.payload,
          loading: false,
        };
        case CONVERT_POINTS:
          console.log('CONVERT_POINTS', action.payload)
          return {
            ...state,
            // rewards: action.payload,
            loading: false,
          };
      case GET_SELLER_CREDITS:
        console.log('GET_SELLER_CREDITS', action.payload)
        return {
          ...state,
          credits: action.payload,
          loading: false,
        };
        case GET_SELLERS:
          console.log('GET_SELLERS', action.payload)
          return {
            ...state,
            sellers: action.payload,
            loading: false,
          };
    default:
      return state;
  }
}
