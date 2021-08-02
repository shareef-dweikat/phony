import { GET_CARDS, GET_COPMANY_CARDS } from "../actions/types";
const initialState = {
  cards: [],
  companyCards: [],
  loading: true,
};

const cards = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false,
      };
    case GET_COPMANY_CARDS:
      return {
        ...state,
      };
    default:
      return {
        ...state,
        companyCards: action.payload,
        loading: false,
      };
  }
};
export default cards;
