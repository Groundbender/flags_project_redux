import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectControls } from "../controls/controls-slice";
import {
  loadCountries,
  selectCountriesInfo,
  selectVisibleCountries,
} from "./countries-slice";

export const useCountries = () => {
  const dispatch = useDispatch();

  const { status, error, countriesNumber } = useSelector(selectCountriesInfo);

  const { search, region } = useSelector(selectControls);

  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search, region })
  );

  useEffect(() => {
    if (!countriesNumber) {
      dispatch(loadCountries());
    }
  }, [countriesNumber, dispatch]);

  return [countries, { status, error, countriesNumber }];
};
