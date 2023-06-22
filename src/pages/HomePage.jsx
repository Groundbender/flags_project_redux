import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import {
  selectCountriesInfo,
  selectVisibleCountries,
} from "../store/countries/coutries-selectors";
import { loadCountries } from "../store/countries/countries-actions";
import loadImg from "../assests/img/loader-black.svg";
import { selectControls } from "../store/controls/controls-selectors";
import throttle from "lodash.throttle";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, error, countriesNumber } = useSelector(selectCountriesInfo);

  const { search, region } = useSelector(selectControls);

  // const visibleCountries = useSelector((state) =>
  //   selectVisibleCountries(state, search)
  // );
  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search, region })
  );

  useEffect(() => {
    if (!countriesNumber) {
      dispatch(loadCountries());
    }
  }, [countriesNumber, dispatch]);

  return (
    <>
      <Controls />

      {error && <h2>Couldn't get countries</h2>}
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
      {status === "received" && countries.length !== 0 ? (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: "Population",
                  description: c.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: c.region,
                },
                {
                  title: "Capital",
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "100px auto 100px auto",
          }}
        >
          <h2>Countries are not found</h2>
        </div>
      )}
    </>
  );
};
