import {
  GET_LAST_TRANSACTION,
  GET_SELLER_POINTS,
  GET_SELLER_REPORTS,
  GET_SELLER_PROFIT
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
      case GET_SELLER_POINTS:
      return {
        ...state,
        sellerPoints: action.payload,
        loading: false,
      };
      case GET_SELLER_REPORTS:
        return {
          ...state,
          sellerReports: action.payload,
          loading: false,
        };
        case GET_SELLER_PROFIT:
          return {
            ...state,
            sellerProfit: action.payload,
            loading: false,
          };
    default:
      return state;
  }
}
