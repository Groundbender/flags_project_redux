import { useSelector, useDispatch } from "react-redux";
import { setSearch, selectSearch } from "./controls-slice";

export const useSearch = () => {
  const search = useSelector(selectSearch);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return [search, handleSearch];
};
