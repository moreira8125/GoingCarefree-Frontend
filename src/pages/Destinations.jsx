import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bgImage from "../../public/images/destinations1.png";
import "../styles/destinations.css";

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

  const skeletonDestination = () => {
    return (
      <div className="border-2 border-gray-500 rounded-customRadius h-96 flex flex-col md:flex-row my-20 gap-2 pt-8 px-8">
        <div className="rounded-customRadius h-72 w-full md:w-w_custom bg-gray-400 animate-pulse flex items-center justify-center">
          <svg
            className="w-24 h-24 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="flex flex-col w-full md:w-2/4 gap-4 items-center animate-pulse">
          <div className="h-10 w-3/4 bg-gray-400 rounded-xl"></div>
          <div className="flex flex-col gap-2 w-full px-4 md:px-0">
            <div className="flex items-center w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-32"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[400px]">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-200 rounded-full dark:bg-gray-500 w-80"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 ml-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[440px]">
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-32"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
              <div className="h-2.5 ml-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[360px]">
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-200 rounded-full dark:bg-gray-500 w-80"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[360px]">
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-200 rounded-full dark:bg-gray-500 w-80"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
            </div>
            <div className="flex items-center w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-32"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[400px]">
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-200 rounded-full dark:bg-gray-500 w-80"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 ml-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[440px]">
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-32"></div>
              <div className="h-2.5 ml-2 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
              <div className="h-2.5 ml-2 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          <h2 className="mb-4 mt-20 text-xl lg:text-4xl font-bold text-navbar_color">
            Sorry! We have no destinations matching your criteria.
          </h2>
        )}
        {fetching &&
          destinations.length === 0 &&
          Array.from({ length: 15 }).map((_, index) => (
            <div key={index}>{skeletonDestination()}</div>
          ))}
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
                  className="border group-hover:border-navbar_color rounded-customRadius w-48 md:w-80 lg:w-96 xl:w-w_custom"
                />
                <div className="packageInfo group-hover:text-white text-navbar_color">
                  <h2 className="mb-4 text-md xl:text-2xl font-bold">
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
