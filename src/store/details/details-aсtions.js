export const SET_LOADING = "@@details/SET_LOADING";
export const SET_ERROR = "@@details/SET_ERROR";
export const SET_COUNTRY = "@@details/SET_COUNTRY";
export const CLEAR_DETAILS = "@@details/CLEAR_DETAILS";
export const SET_NEIGHBORS = "@@details/SET_NEIGHBOURS";

const setLoading = () => ({
  type: SET_LOADING,
});

const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country,
});
const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const clearDetails = () => ({
  type: CLEAR_DETAILS,
});

const setNeighbors = (countries) => ({
  type: SET_NEIGHBORS,
  payload: countries,
});

export const loadCountryByName =
  (name) =>
  (dispatch, getState, { axios, api }) => {
    dispatch(setLoading());
    axios
      .get(api.searchByCountry(name))
      .then(({ data }) => dispatch(setCountry(data[0])))
      .catch((error) => setError(error.message));
  };

export const loadNeighborsByBorder =
  (borders) =>
  (dispatch, getState, { axios, api }) => {
    axios
      .get(api.filterByCode(borders))
      .then(({ data }) => dispatch(setNeighbors(data.map((c) => c.name))))
      .catch(console.error);
  };
