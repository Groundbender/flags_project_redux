import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

import { Button } from "../components/Button";
import { Info } from "../components/Info";
import {
  selectDetails,
  selectCurrentCountry,
} from "../store/details/details-selectors";
import {
  clearDetails,
  loadCountryByName,
} from "../store/details/details-aсtions";
import loadImg from "../assests/img/loader-black.svg";

export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { status, error, currentCountry } = useSelector(selectDetails);
  const dispatch = useDispatch();
  // const currentCountry = null;

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => dispatch(clearDetails());
  }, [name, dispatch]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {error && <h2>{error}</h2>}
      {status === "loading" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img style={{ textAlign: "center" }} src={loadImg} alt="" />
        </div>
      )}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};
