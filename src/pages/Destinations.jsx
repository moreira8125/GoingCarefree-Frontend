import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bgImage from "../../public/images/destinations1.png";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/cities`)
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
      .get(`${import.meta.env.VITE_API_URL}/cities?&${params.toString()}`)
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
      <div className="container mx-auto w-2/3 text-center ">
        <h1 className="mb-8 mt-6 font-bold leading-none tracking-tight text-navbar_color text-2xl md:text-3xl lg:text-5xl text-center">
          Destinations
        </h1>
        <Link>
          <h3
            className="mb-4 font-bold leading-none tracking-tight text-navbar_color text-lg md:text-xl lg:text-2xl hover:underline text-center"
            onClick={handleTitleClick}
          >
            Click Here For Your Perfect Vacation
          </h3>
        </Link>

        {showForm && (
          <form
            className="destinationsForm lg:w-48  w-36 mx-auto"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor=""
              className="mb-2 text-md font-medium text-gray-600 "
            >
              Budget
              <input
                type="number"
                onChange={(e) => {
                  setBudget(e.target.value);
                }}
                value={budget}
                className="border  text-gray-900 text-sm rounded-lg ring-blue-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white text-center"
              />
            </label>
            <label
              htmlFor=""
              className="mb-2 text-md font-medium text-gray-600 "
            >
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
                <option value="Beach and Sun">Beach and Sun</option>
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

            <button className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/3  px-5 py-2.5 text-center bg-navbar_color hover:bg-blue-400 mt-5">
              Search
            </button>
          </form>
        )}

        {!fetching && destinations.length === 0 && (
          <h2 className="mb-4 mt-20 text-xl font-bold">
            Sorry! We have no destinations matching your criteria.
          </h2>
        )}
        {fetching && destinations.length === 0 && (
          <h2 className="mb-4 text-xl text-navbar_color font-bold">
            Loading...
          </h2>
        )}

        {destinations.map((oneDestination) => {
          return (
            <Link
              key={oneDestination.id}
              className="link"
              to={`/destinations/${oneDestination.id}`}
            >
              <div className="group flex flex-col mx-auto my-20 items-center justify-center gap-2 border-2 border-navbar_color pt-4 px-4 rounded-customRadius bg-white hover:bg-navbar_color md:justify-evenly md:gap-4 md:flex-row md:p-8">
                <img
                  src={oneDestination.image}
                  alt="cityImage"
                  className="border group-hover:border-navbar_color rounded-customRadius w-32 md:w-80 lg:w-96 xl:w-w_custom"
                />
                <div className="packageInfo group-hover:text-white text-navbar_color">
                  <h2 className="mb-4 text-md font-bold">
                    {oneDestination.name}
                  </h2>
                  <p className="hidden md:block">{oneDestination.hook}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Destinations;
