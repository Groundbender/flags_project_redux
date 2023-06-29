import { Info } from "./Info";
import loadImg from "../../assests/img/loader-black.svg";
import { useDetails } from "./use-details";

const CountryDetails = ({ name = "", navigate }) => {
  const { status, error, currentCountry } = useDetails(name);
  return (
    <>
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
    </>
  );
};

export default CountryDetails;
