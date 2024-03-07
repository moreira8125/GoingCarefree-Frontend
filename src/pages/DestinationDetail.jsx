import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import greenTick from "../../public/images/greenTick.png";

function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destResult = await axios.get(
          `${import.meta.env.VITE_API_URL}/cities/${id}`
        );
        setDestination(destResult.data);
        const reviewResult = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews`
        );
        setReviews(reviewResult.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);
    updateWindowWidth(); // Initial set

    return () => window.removeEventListener("resize", updateWindowWidth);
  }, [id]);

  const filteredReviews = reviews.filter(
    (review) => review.package === destination?.name
  );

  const prevReview = () => {
    setCurrentIndex((prevIndex) => {
      const totalReviews = filteredReviews.length;
      return prevIndex - 1 < 0 ? totalReviews - 1 : prevIndex - 1;
    });
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) => {
      const totalReviews = filteredReviews.length;
      return prevIndex + 1 >= totalReviews ? 0 : prevIndex + 1;
    });
  };

  const getReviewsToShow = () => {
    if (windowWidth >= 1700) {
      return 3;
    } else if (windowWidth >= 1200) {
      return 2;
    } else {
      return 1;
    }
  };

  const reviewsToShow = getReviewsToShow();
  let displayedReviews = filteredReviews.slice(
    currentIndex,
    currentIndex + reviewsToShow
  );
  if (
    displayedReviews.length < reviewsToShow &&
    filteredReviews.length > reviewsToShow
  ) {
    displayedReviews = displayedReviews.concat(
      filteredReviews.slice(0, reviewsToShow - displayedReviews.length)
    );
  }

  const handleClick = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const timer = setTimeout(() => {
      setSubmitted(false);
    }, 3000);

    const handleOutsideClick = () => {
      clearTimeout(timer);
      setSubmitted(false);
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  };

  return (
    <div>
      <div className="mt-4 ml-5">
        <Link to="/destinations">
          <i className="fi fi-rs-arrow-circle-left text-2xl md:text-3xl lg:text-5xl text-navbar_color"></i>
        </Link>
      </div>

      {destination ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl  font-extrabold text-navbar_color">
              {destination.name}
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-navbar_color">
              {destination.city}, {destination.country}
            </h2>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-16">
              <img
                src={destination.image}
                alt="city image"
                className="w-3/4 lg:w-w_custom rounded-customRadius"
              />
              <p className="text-xs w-2/3 text-center font-semibold lg:font-bold lg:w-1/3 lg:text-base lg:text-start lg:block">
                {destination.description}
              </p>
            </div>

            <div className=" border-navbar_color border-2 rounded-full flex-col lg:flex-row flex w-2/3 justify-around p-2 mt-12">
              {/* LARGE SCREENS */}
              <div className="lg:flex lg:gap-32 hidden">
                <span className="flex items-center gap-2 lg:gap-4 text-navbar_color">
                  <i className="fi fi-rs-bed text-lg lg:text-2xl mt-1"></i>
                  <span className="font-bold text-base">
                    {destination.hotel}
                  </span>
                </span>

                <span className="flex items-center gap-2 lg:gap-4 text-navbar_color">
                  <i className="fi fi-rs-euro text-lg lg:text-2xl mt-1"></i>{" "}
                  <span className="font-bold text-base">
                    {destination.price}€
                  </span>
                </span>

                <span className="flex items-center gap-2 lg:gap-4 text-navbar_color">
                  <i className="fi fi-rs-calendar text-lg lg:text-2xl mt-1"></i>
                  <span className="font-bold text-base">
                    {destination.duration} days
                  </span>
                </span>

                <span className="flex items-center gap-2 lg:gap-4 text-navbar_color">
                  <i className="fi fi-rs-utensils text-lg lg:text-2xl mt-1"></i>
                  <span className="font-bold text-base">
                    {destination.pensionType}
                  </span>
                </span>
              </div>

              {/* MOBILE AND TABLETS */}
              <div className="flex-row flex justify-center gap-8 lg:hidden">
                <span className="flex items-center gap-2 lg:gap-4 text-navbar_color">
                  <i className="fi fi-rs-bed text-lg lg:text-2xl mt-1"></i>
                  <span className="font-bold text-xs">{destination.hotel}</span>
                </span>

                <span className="flex items-center gap-2 lg:gap-4 text-navbar_color">
                  <i className="fi fi-rs-euro text-lg lg:text-2xl mt-1"></i>{" "}
                  <span className="font-bold text-xs">
                    {destination.price}€
                  </span>
                </span>
              </div>

              <div className="flex-row flex justify-center gap-8 lg:hidden">
                <span className="flex items-center gap-2 lg:gap-4 text-navbar_color">
                  <i className="fi fi-rs-calendar text-lg lg:text-2xl mt-1"></i>
                  <span className="font-bold text-xs">
                    {destination.duration} days
                  </span>
                </span>

                <span className="flex items-center gap-2 lg:gap-4 text-navbar_color">
                  <i className="fi fi-rs-utensils text-lg lg:text-2xl mt-1"></i>
                  <span className="font-bold text-xs">
                    {destination.pensionType}
                  </span>
                </span>
              </div>
            </div>
            <form onSubmit={handleClick}>
              <button className="mt-16 border-2  font-extrabold bg-navbar_color text-white px-8 py-4 rounded-lg hover:bg-white hover:text-navbar_color hover:border-navbar_color hover:border-2">
                BOOK NOW
              </button>
            </form>
          </div>

          {filteredReviews.length > 0 ? (
            <div className="flex flex-col items-center bg-navbar_color bg-opacity-20 justify-center mt-8 p-9">
              <h1 className="text-3xl mb-8 font-extrabold text-navbar_color">
                Reviews
              </h1>
              <div className="flex">
                {filteredReviews.length > reviewsToShow && (
                  <button onClick={prevReview}>
                    <BsChevronCompactLeft size={30} />
                  </button>
                )}
                {displayedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="review-card p-4 border-2 rounded-lg mx-2 lg:w-[500px] min-h-[360px] bg-white md:w-[300px] sm:w-[300px]"
                  >
                    <div className="flex mb-0">
                      <img
                        src={review.flag}
                        className="w-8 mb-4 mr-4"
                        alt="Flag"
                      />
                      <h2 className="text-lg font-extrabold mb-2">
                        {review.name}
                      </h2>
                    </div>
                    <div className="flex flex-col justify-start mb-2">
                      <h3 className="text-md font-semibold mb-2">
                        {review.package}
                      </h3>
                      <img
                        src={review.rate}
                        className="w-32 h-auto"
                        alt="Rating"
                      />
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
                {filteredReviews.length > reviewsToShow && (
                  <button onClick={nextReview}>
                    <BsChevronCompactRight size={30} />
                  </button>
                )}
              </div>
              <Link to="/reviews">
                <h1 className="flex justify-center  text-2xl text-center mb-0 mt-6 font-extrabold text-navbar_color hover:underline">
                  Click here to see other destinations' reviews
                </h1>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center bg-navbar_color bg-opacity-20 justify-center mt-8 mb-8 mx-auto w-1/2 rounded-lg p-8 ">
              <h1 className="text-2xl lg:text-3xl text-center mb-4 font-extrabold text-navbar_color">
                No reviews on this destination
              </h1>
              <Link to="/reviews">
                <p className="text-base lg:text-2xl mb-0 mt-0  text-center font-extrabold text-navbar_color hover:underline">
                  Click here to leave us the first one
                </p>
              </Link>
            </div>
          )}
        </>
      ) : (
        <h2 className="mb-4 mt-20 text-xl font-bold">Loading...</h2>
      )}
      {submitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white flex flex-col justify-center items-center border rounded-lg p-8">
            <img className="w-20 mb-4" src={greenTick} alt="Success" />
            <h1 className="font-helvetica font-bold text-gray-900">
              Thank you!
            </h1>
            <h2 className="text-gray-900">
              We received your booking, we will contact you soon!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationDetail;
