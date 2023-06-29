import { useDispatch } from "react-redux";
import { clearControls } from "./controls-slice";

export const useCleanup = () => {
  const dispatch = useDispatch();

  const clearFilters = () => dispatch(clearControls());

  return clearFilters;
};
