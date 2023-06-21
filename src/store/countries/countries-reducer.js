import { SET_COUNTRIES, SET_ERROR, SET_LOADING } from "./countries-actions";

const initialState = {
  status: "idle", // loading || received || rejected
  list: [],
  error: null,
};

export const countriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        status: "loading",
        error: null,
      };
    case SET_COUNTRIES:
      return {
        ...state,
        list: payload,
        status: "received",
      };
    case SET_ERROR:
      return {
        ...state,
        status: "rejected",
        error: payload,
      };

    default:
      return state;
  }
};
