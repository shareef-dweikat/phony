import {
  GET_LAST_TRANSACTION,
  GET_SELLER_POINTS,
  GET_SELLER_REPORTS,
  GET_SELLER_PROFIT,
  GET_SELLER_RUNNING_REPORTS,
  GET_SELLER_CANCELATION_REPORTS
} from "../actions/types";
const initialState = {
  lastTransaction: [],
  loading: true,
  sellerRunning: [],
  sellerCancelationReports: []
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
          case GET_SELLER_RUNNING_REPORTS:
            return {
              ...state,
              sellerRunning: action.payload,
              loading: false,
            };
          case GET_SELLER_CANCELATION_REPORTS:
            return {
              ...state,
              sellerCancelationReports: action.payload,
              loading: false,
            };
    default:
      return state;
  }
}
