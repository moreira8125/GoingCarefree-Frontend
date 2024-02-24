import { useState, useEffect } from "react";
import axios from "axios";

function Reviews() {
  const [review, setReview] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [newName, setNewName] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newPackage, setNewPackage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newReview = {
      name: newName,
      flag: newCountry,
      package: newPackage,
      comment: newComment,
      rate: newRating,
    };

    axios
      .post("http://localhost:5005/reviews", newReview)
      .then(() => {
        return axios.get("http://localhost:5005/reviews");
      })
      .then((result) => {
        setReview(result.data);
        setNewName("");
        setNewCountry("");
        setNewPackage("");
        setNewRating("");
        setNewComment("");
      })
      .catch((err) => {
        console.log(err);
      });
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
              <div className="flex justify-start mb-2 items-center">
                <h3 className="mr-4 text-md font-semibold text-navbar_color">
                  {oneReview.package}
                </h3>
                <img src={oneReview.rate} className="w-32 h-auto"></img>
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
          className="w-48 mx-auto text-center flex flex-col items-center mb-12"
          onSubmit={handleSubmit}
        >
          <label className="mb-2 text-md font-medium text-gray-600 ">
            Name
            <input
              type="text"
              className="border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              value={newName}
              required
            />
          </label>

          <label className="mb-2 text-md font-medium text-gray-600 ">
            Country
            <select
              className="border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
              onChange={(e) => {
                setNewCountry(e.target.value);
              }}
              value={newCountry}
              required
            >
              <option value=""></option>
              {countries.map((result) => {
                return (
                  <option
                    key={result._id}
                    value={`https://flagpedia.net/data/flags/icon/72x54/${result.alpha2Code.toLowerCase()}.png`}
                  >
                    {result.name.common}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            Package
            <select
              className="border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
              onChange={(e) => {
                setNewPackage(e.target.value);
              }}
              value={newPackage}
              required
            >
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

          <label>
            Rating
            <select
              className="border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white mb-4"
              onChange={(e) => {
                setNewRating(e.target.value);
              }}
              value={newRating}
              required
            >
              <option value=""></option>
              <option value="/images/star1.png">⭐</option>
              <option value="/images/star2.png">⭐⭐</option>
              <option value="/images/star3.png">⭐⭐⭐</option>
              <option value="/images/star4.png">⭐⭐⭐⭐</option>
              <option value="/images/star5.png">⭐⭐⭐⭐⭐</option>
            </select>
          </label>

          <label className="mb-2 text-md font-medium text-gray-600 ">
            Comment
            <textarea
              cols="50"
              rows="10"
              className="border text-gray-900 text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white mb-4"
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              value={newComment}
            ></textarea>
          </label>

          <button className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-navbar_color hover:bg-blue-400 mt-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
