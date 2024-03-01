import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AdminEdit() {
  const { reviewId } = useParams();

  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [vacationPackage, setVacationPackage] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/reviews/${reviewId}`)
      .then((result) => {
        console.log(result.data);
        setName(result.data.name);
        setCountry(result.data.flag);
        setVacationPackage(result.data.package);
        setComment(result.data.comment);
        setRating(result.data.rate);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://ih-countries-api.herokuapp.com/countries/")
      .then((result) => {
        const sortedCountries = result.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5005/cities")
      .then((result) => {
        setDestinations(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let editedReview = {
      name: name,
      flag: country,
      package: vacationPackage,
      comment: comment,
      rate: rating,
    };

    axios
      .put(`http://localhost:5005/reviews/${reviewId}`, editedReview)
      .then(() => {
        navigate("/admin");
      });
  };
  return (
    <>
      <div>
        <div className="mt-4 ml-5">
          <Link to="/admin">
            <i className="fi fi-rs-arrow-circle-left text-5xl text-navbar_color"></i>
          </Link>
        </div>
      </div>
      <div>
        <form
          className="w-48 mx-auto text-center flex flex-col items-center mb-12"
          onSubmit={handleSubmit}
        >
          <label className="mb-2 text-md font-medium text-gray-900 ">
            Name
            <input
              type="text"
              className="border text-white text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
          </label>

          <label className="mb-2 text-md font-medium text-gray-900 ">
            Country
            <select
              className="border text-white text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              value={country}
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
              className="border text-white text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
              onChange={(e) => {
                setVacationPackage(e.target.value);
              }}
              value={vacationPackage}
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
                setRating(e.target.value);
              }}
              value={rating}
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

          <label className="mb-2 text-md font-medium text-gray-900 ">
            Comment
            <textarea
              cols="50"
              rows="10"
              className="border text-white text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white mb-4"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            ></textarea>
          </label>

          <button className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-navbar_color hover:bg-blue-400 mt-2">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminEdit;
