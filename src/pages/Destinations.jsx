import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Destinations.css";
import { Link } from "react-router-dom";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5005/cities")
      .then((result) => {
        setDestinations(result.data);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();

    if (budget) {
      params.append("price_lte", budget);
    }

    if (type) {
      params.append("destinationType", type);
    }

    if (country) {
      params.append("country", country);
    }

    axios
      .get(`http://localhost:5005/cities?&${params.toString()}`)
      .then((result) => {
        setDestinations(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(destinations.length);
    setBudget("");
    setType("");
    setCountry("");
  }

  return (
    <div>
      <h1>Destinations</h1>

      <form className="destinationsForm" onSubmit={handleSubmit}>
        <h2>Search Your Perfect Vacation</h2>

        <label htmlFor="">
          Budget
          <input
            type="number"
            placeholder="Your budget"
            onChange={(e) => {
              setBudget(e.target.value);
            }}
            value={budget}
          />
        </label>
        <label htmlFor="">
          Type
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
          >
            <option value=""></option>
            <option value="City">City</option>
            <option value="Nature">Nature</option>
            <option value="Beach">Beach</option>
            <option value="Wellness">Wellness</option>
            <option value="Health">Health</option>
          </select>
        </label>
        <label htmlFor="">
          Country
          <select
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            value={country}
          >
            <option value=""></option>
            <option value="England">England</option>
            <option value="France">France</option>
            <option value="Portugal">Portugal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Spain">Spain</option>
            <option value="Iceland">Iceland</option>
            <option value="USA">USA</option>
            <option value="Australia">Australia</option>
            <option value="Kenya">Kenya</option>
            <option value="Turkey">Turkey</option>
          </select>
        </label>

        <button>Search</button>
      </form>

      {!fetching && destinations.length === 0 && (
        <h2>Sorry! We have no destinations matching your criteria.</h2>
      )}
      {fetching && destinations.length === 0 && <h2>Loading...</h2>}

      {destinations.map((oneDestination) => {
        return (
          <Link key={oneDestination.id} className="link">
            <div id="package">
              <img src={oneDestination.image} alt="cityImage" />
              <div className="packageInfo">
                <h2>{oneDestination.name}</h2>
                <p>{oneDestination.hook}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Destinations;
