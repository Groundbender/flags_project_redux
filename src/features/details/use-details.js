import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearDetails,
  loadCountryByName,
  selectDetails,
} from "./details-slice";

export const useDetails = (name) => {
  const details = useSelector(selectDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => dispatch(clearDetails());
  }, [name, dispatch]);

  return details;
};
