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
  const [showForm, setShowForm] = useState(true);

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

  function handleTitleClick() {
    setShowForm(!showForm);
  }

  return (
    <div>
      <Link>
        <h1
          className="mb-4 text-xl font-extrabold leading-none tracking-tight text-navbar_color md:text-2xl lg:text-4xl hover:underline"
          onClick={handleTitleClick}
        >
          Click Here For Your Perfect Vacation
        </h1>
      </Link>

      {showForm && (
        <form className="destinationsForm w-48 mx-auto" onSubmit={handleSubmit}>
          <label htmlFor="" className="mb-2 text-md font-medium text-gray-600 ">
            Budget
            <input
              type="number"
              placeholder="Your budget"
              onChange={(e) => {
                setBudget(e.target.value);
              }}
              value={budget}
              className="border  text-gray-900 text-sm rounded-lg ring-blue-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white text-center"
            />
          </label>
          <label htmlFor="" className="mb-2 text-md font-medium text-gray-600 ">
            Type
            <select
              onChange={(e) => {
                setType(e.target.value);
              }}
              value={type}
              className="border  text-gray-900 text-sm rounded-lg ring-blue-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white text-center"
            >
              <option value=""></option>
              <option value="City">City</option>
              <option value="Nature">Nature</option>
              <option value="Beach">Beach</option>
              <option value="Wellness">Wellness</option>
              <option value="Health">Health</option>
            </select>
          </label>
          <label
            htmlFor=""
            className="className=mb-2 text-md font-medium text-gray-600 "
          >
            Country
            <select
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              value={country}
              className="border  text-gray-900 text-sm rounded-lg ring-blue-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white text-center"
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

          <button className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-navbar_color hover:bg-blue-400 mt-5">
            Search
          </button>
        </form>
      )}

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
                <h2 className="mb-4 text-xl font-bold">
                  {oneDestination.name}
                </h2>
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
