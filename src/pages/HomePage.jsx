import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import {
  selectAllCountries,
  selectCountriesInfo,
} from "../store/countries/coutries-selectors";
import { loadCountries } from "../store/countries/countries-actions";
import loadImg from "../assests/img/loader-black.svg";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const countries = useSelector(selectAllCountries);
  const { status, error, countriesNumber } = useSelector(selectCountriesInfo);

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
      {status === "received" && (
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
      )}

      {}
    </>
  );
};
