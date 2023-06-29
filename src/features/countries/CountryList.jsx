import { useNavigate } from "react-router-dom";
import { useCountries } from "./use-countries";

import { List } from "../../components/List";
import { Card } from "../../components/Card";

import loadImg from "../../assests/img/loader-black.svg";

const CountryList = () => {
  const navigate = useNavigate();

  const [countries, { status, error }] = useCountries();

  return (
    <>
      {" "}
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
      {countries.length === 0 && status !== "loading" ? (
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
      ) : null}
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
    </>
  );
};

export default CountryList;
