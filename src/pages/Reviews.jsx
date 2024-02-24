import { useState, useEffect } from "react";
import axios from "axios";

function Reviews() {
  const [review, setReview] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [countries, setCountries] = useState([]);

  //useEffect to get the REVIEWS
  useEffect(() => {
    axios
      .get("http://localhost:5005/reviews")
      .then((result) => {
        setReview(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //useEffect to get the COUNTRIES for the select
  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries/")
      .then((result) => {
        const sortedCountries = result.data.sort((a, b) => {
          return a.name.common.localeCompare(b.name.common);
        });
        setCountries(sortedCountries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //useEffect to get the PACKAGE names
  useEffect(() => {
    axios
      .get("http://localhost:5005/cities")
      .then((result) => {
        setDestinations(result.data);
        console.log(destinations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <div className="flex flex-wrap w-full justify-around">
        {review.map((oneReview) => {
          return (
            <div
              key={oneReview.id}
              className="flex flex-col mr-5 mb-8 mt-10 w-1/4 border-2 rounded-lg p-4 border-navbar_color"
            >
              <div className="flex justify-start mb-4">
                <img src={oneReview.flag} alt="" className="w-8 mr-2" />
                <h2 className="inline text-lg font-extrabold text-navbar_color">
                  {oneReview.name}
                </h2>
              </div>
              <div className="flex justify-start mb-2">
                <h3 className="mr-4 text-md font-semibold text-navbar_color">
                  {oneReview.package}
                </h3>
                <p>{oneReview.rate}</p>
              </div>

              <p className="text-left text-sm">{oneReview.comment}</p>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-4xl font-extrabold text-center mt-10 mb-10 text-navbar_color">
          Tell us about your vacation
        </h2>

        <form
          className="w-48 mx-auto text-center flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <label className="mb-2 text-md font-medium text-gray-600 ">
            Name
            <input
              type="text"
              className="border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
            />
          </label>

          <label className="mb-2 text-md font-medium text-gray-600 ">
            Country
            <select className="border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4">
              <option value=""></option>
              {countries.map((result) => {
                return (
                  <option key={result._id} value={result.name.common}>
                    {result.name.common}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            Package
            <select className="border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4">
              <option value=""></option>
              {destinations.map((result) => {
                return (
                  <option value={result.name} key={result.id}>
                    {result.name}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="mb-2 text-md font-medium text-gray-600 ">
            Comment
            <textarea
              cols="50"
              rows="10"
              className="border text-gray-900 text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white mb-4"
            ></textarea>
          </label>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
