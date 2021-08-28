import {
  GET_JAWWAL_3G,
  GET_JAWWAL_CREDIT,
  GET_JAWWAL_MIN,
  GET_JAWWAL_CHARGE,
  ADD_JAWWAL_CHARGE,
  GET_NOT_RENEW_JAWWAL_MIN,
  GET_RENEW_JAWWAL_MIN,
  GET_RENEW_JAWWAL_3G,
  GET_NOT_RENEW_JAWWAL_3G,
  GET_JAWWAL_ROM,
  GET_OOREDOO_3G,
  GET_OOREDOO_MIN,
  GET_OOREDOO_ROM,
  GET_OOREDOO_SUPER,
  LOADING_TRUE,
  GET_RENEW_OOREDOO_SUPER,
  GET_NOR_RENEW_OOREDOO_SUPER,
  GET_OOREDOO_NOT_RENEW_ROM,
  GET_OOREDOO_RENEW_ROM,
  GET_OOREDOO_NOT_RENEW_3G,
  GET_OOREDOO_RENEW_3G,
  GET_OOREDOO_NOT_RENEW_MIN,
  GET_OOREDOO_RENEW_MIN,
  GET_GROUP_COMPANIES,
  GET_AZY,
  GET_HOT,
} from "../actions/types";

const initialState = {
  //JAWWAL
  jawwal3g: [],
  jawwalCreadit: [],
  jawwalMin: [],
  jawwalRom: [],
  chargeJawwal: [],
  jawwalMinFilteer: [],
  jawwal3gFilteer: [],
  //OOREDOO
  ooredoo3g: [],
  ooredoo3gFilter: [],
  ooredooMin: [],
  ooredooMinFilter: [],
  ooredooRom: [],
  ooredooRomFilter: [],
  ooredooSuper: [],
  ooredooSuperFilter: [],
  groupCompaneis: [],
  azy: [],
  hot: [],
  loading: true,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JAWWAL_3G:
      return {
        ...state,
        jawwal3g: action.payload,
        jawwal3gFilteer: action.payload,
        loading: false,
      };
    case GET_JAWWAL_CREDIT:
      return {
        ...state,
        jawwalCreadit: action.payload,
        loading: false,
      };
    case GET_JAWWAL_MIN:
      return {
        ...state,
        jawwalMin: action.payload,
        jawwalMinFilteer: action.payload,

        loading: false,
      };
    case GET_JAWWAL_CHARGE:
      return {
        ...state,
        chargeJawwal: action.payload,
        loading: false,
      };
    case ADD_JAWWAL_CHARGE:
      return {
        ...state,
        chargeJawwal: (chargeJawwal) => [...chargeJawwal, action.payload],
      };
    case GET_RENEW_JAWWAL_MIN:
      return {
        ...state,
        jawwalMin: state.jawwalMinFilteer.filter(({ renew }) => renew === "True" || renew === "true"),
      };
    case GET_NOT_RENEW_JAWWAL_MIN:
      return {
        ...state,
        jawwalMin: state.jawwalMinFilteer.filter(({ renew }) => renew === "False" || renew === "false"),
      };
    case GET_RENEW_JAWWAL_3G:
      return {
        ...state,
        jawwal3g: state.jawwal3gFilteer.filter(({ renew }) => renew === "True" || renew === "true"),
      };
    case GET_NOT_RENEW_JAWWAL_3G:
      return {
        ...state,
        jawwal3g: state.jawwal3gFilteer.filter(({ renew }) => renew === "False" || renew === "false"),
      };
    case GET_JAWWAL_ROM:
      return {
        ...state,
        jawwalRom: action.payload,
        loading: false,
      };
    case LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };

    //OOREDOO------------------------------------
    case GET_OOREDOO_3G:
      return {
        ...state,
        ooredoo3g: action.payload,
        ooredoo3gFilter: action.payload,
        loading: false,
      };
    case GET_OOREDOO_RENEW_3G:
      return {
        ...state,
        ooredoo3g: state.ooredoo3gFilter.filter(({ auto_renew }) => auto_renew === "True" || auto_renew === "true"),
      };
    case GET_OOREDOO_NOT_RENEW_3G:
      return {
        ...state,
        ooredoo3g: state.ooredoo3gFilter.filter(({ auto_renew }) => auto_renew === "False" || auto_renew === "false"),
      };
    case GET_OOREDOO_MIN:
      return {
        ...state,
        ooredooMin: action.payload,
        ooredooMinFilter: action.payload,
        loading: false,
      };
    case GET_OOREDOO_RENEW_MIN:
      return {
        ...state,
        ooredooMin: state.ooredooMinFilter.filter(({ auto_renew }) => auto_renew === "True" || auto_renew === "true"),
      };
    case GET_OOREDOO_NOT_RENEW_MIN:
      return {
        ...state,
        ooredooMin: state.ooredooMinFilter.filter(({ auto_renew }) => auto_renew === "False" || auto_renew === "false"),
      };
    case GET_OOREDOO_ROM:
      return {
        ...state,
        ooredooRom: action.payload,
        ooredooRomFilter: action.payload,
        loading: false,
      };
    case GET_OOREDOO_RENEW_ROM:
      return {
        ...state,
        ooredooRom: state.ooredooRomFilter.filter(({ auto_renew }) => auto_renew === "True" || auto_renew === "true"),
      };
    case GET_OOREDOO_NOT_RENEW_ROM:
      return {
        ...state,
        ooredooRom: state.ooredooRomFilter.filter(({ auto_renew }) => auto_renew === "False" || auto_renew === "false"),
      };
    case GET_OOREDOO_SUPER:
      return {
        ...state,
        ooredooSuper: action.payload,
        ooredooSuperFilter: action.payload,
        loading: false,
      };
    case GET_RENEW_OOREDOO_SUPER:
      return {
        ...state,
        ooredooSuper: state.ooredooSuperFilter.filter(({ auto_renew }) => auto_renew === "True" || auto_renew === "true"),
      };
    case GET_NOR_RENEW_OOREDOO_SUPER:
      return {
        ...state,
        ooredooSuper: state.ooredooSuperFilter.filter(({ auto_renew }) => auto_renew === "False" || auto_renew === "false"),
      };
    case GET_GROUP_COMPANIES:
      return {
        ...state,
        groupCompaneis: action.payload,
        loading: false,
      };
    case GET_AZY:
      return {
        ...state,
        azy: action.payload,
        loading: false,
      };
    case GET_HOT:
      return {
        ...state,
        hot: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
