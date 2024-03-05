import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import axios from "axios";
import bgImage from "../../public/images/nature6.png";
import { Link } from "react-router-dom";
import greenTick from "../../public/images/greenTick.png";


function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const [countries, setCountries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [newName, setNewName] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newPackage, setNewPackage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [submitted, setSubmitted] = useState(false);


  const handleOutsideClick = () => {
    setSubmitted(false);
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews`)
      .then((result) => {
        setReviews(result.data);
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
      .get(`${import.meta.env.VITE_API_URL}/cities`)
      .then((result) => {
        setDestinations(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const prevReview = () => {
    setCurrentIndex((prevIndex) => {
      const totalReviews = reviews.length;
      return prevIndex - 1 < 0 ? totalReviews - 1 : prevIndex - 1;
    });
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) => {
      const totalReviews = reviews.length;
      return prevIndex + 1 >= totalReviews ? 1 : prevIndex + 1;
    });
  };
  const getReviewsToShow = () => {
    if (windowWidth >= 1700) { 
      return 3; 
    } else if (windowWidth >= 1200) { 
      return 2; 
    } else  {
      return 1; 
    }
  };
  const reviewsToShow = getReviewsToShow();
  const displayedReviews = reviews.length > 0 ? reviews.slice(currentIndex, currentIndex + reviewsToShow) : [];
  if (displayedReviews.length < reviewsToShow && reviews.length > 0) {
    displayedReviews.push(...reviews.slice(0, reviewsToShow - displayedReviews.length));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name: newName,
      flag: newCountry,
      package: newPackage,
      comment: newComment,
      rate: newRating,
    };

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);

    document.addEventListener("click", () => {
      clearTimeout();
      handleOutsideClick();
    });
  
    axios
      .post(`${import.meta.env.VITE_API_URL}/reviews`, newReview)
      .then(() => axios.get(`${import.meta.env.VITE_API_URL}/reviews`))
      .then((result) => {
        setSubmitted(true);
        setReviews(result.data);
        setNewName("");
        setNewCountry("");
        setNewPackage("");
        setNewRating("");
        setNewComment("");
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full   bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {
        <h2 className="text-4xl text-navbar_color font-extrabold text-center mt-10 mb-10">
          Our clients' feedback
        </h2>
      }
      <div className="flex justify-center ">
        <button onClick={nextReview}>
          <BsChevronCompactLeft size={30} color="black" />
        </button>
        {displayedReviews.map((oneReview) => (
          <div
            key={oneReview.id}
            className=" review-card p-4 border-2 rounded-lg mx-2 lg:w-[500px]  min-h-[360px]   bg-white  md:w-[300px] sm:w-[300px] "
          >
            <div className="flex mb-0 ">
              <img src={oneReview.flag} className="w-8 mb-4 mr-4" />
              <h2 className="text-lg font-extrabold mb-2">{oneReview.name}</h2>
            </div>
            <div className="flex flex-col justify-start mb-2">
              <h3 className="text-md font-semibold mb-2">
                {oneReview.package}
              </h3>

              <img src={oneReview.rate} className="w-32 h-auto" />
            </div>
            <p className="text-sm">{oneReview.comment}</p>
          </div>
        ))}
        <button onClick={prevReview}>
          <BsChevronCompactRight size={30} color="black" />
        </button>
      </div>

      <div>
        <h2 className="  text-navbar_color text-4xl font-extrabold text-center mt-10 mb-10">
          Tell us about your vacation
        </h2>

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
                setNewName(e.target.value);
              }}
              value={newName}
              required
            />
          </label>

          <label className="mb-2 text-md font-medium text-gray-900 ">
            Country
            <select
              className="border text-white text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
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
              className="border text-white text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-center dark:text-white mb-4"
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

          <label className="mb-2 text-md font-medium text-gray-900 ">
            Comment
            <textarea
              cols="50"
              rows="10"
              className="border text-white text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white mb-4 w-full md:w-fit"
               //className="border  text-gray-900 text-sm rounded-lg ring-blue-500 block p-2.5 bg-white border-gray-600 placeholder-gray-400 dark:text-navbar_color bg-opacity-50 w-full md:w-fit"
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
      {submitted && (
               <div className="bg-white flex flex-col justify-center  items-center absolute  mx-auto border rounded-lg mt-10 top-1/2 p-8">
            <img className="w-20 mb-4 " src={greenTick} />
            <h1 className="font-helvetiva font-bold  text-gray-900">
              Thank you!
            </h1>
            <h2 className=" text-gray-900">You review was uploaded succesfully</h2>
          </div>
        )}
      
    </div>
  );
}

export default Reviews;
