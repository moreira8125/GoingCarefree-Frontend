import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import greenTick from "../../public/images/greenTick.png";

function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/cities/${id}`)
      .then((result) => {
        setDestination(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOutsideClick = () => {
    setSubmitted(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);

    document.addEventListener("click", () => {
      clearTimeout();
      handleOutsideClick();
    });
  };

  return (
    <div>
      <div className="mt-4 ml-5">
        <Link to="/destinations">
          <i className="fi fi-rs-arrow-circle-left text-5xl text-navbar_color"></i>
        </Link>
      </div>

      {destination ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold text-navbar_color">
              {destination.name}
            </h1>
            <h2 className="text-2xl font-bold text-navbar_color">
              {destination.city}, {destination.country}
            </h2>
            <div className="flex items-center justify-center gap-6 mt-16">
              <img src={destination.image} alt="city image" />
              <p className="w-1/3 font-bold">{destination.description}</p>
            </div>

            <div className=" border-navbar_color border-2 rounded-full  flex w-2/3 justify-around p-2 mt-12">
              <span className="flex items-center gap-4 text-navbar_color">
                <i className="fi fi-rs-bed text-2xl mt-1"></i>
                <span className="font-bold">{destination.hotel}</span>
              </span>

              <span className="flex items-center gap-4 text-navbar_color">
                <i className="fi fi-rs-euro text-2xl mt-1"></i>{" "}
                <span className="font-bold">{destination.price}€</span>
              </span>
              <span className="flex items-center gap-4 text-navbar_color">
                <i className="fi fi-rs-calendar text-2xl mt-1"></i>
                <span className="font-bold">{destination.duration} days</span>
              </span>
              <span className="flex items-center gap-4 text-navbar_color">
                <i className="fi fi-rs-utensils text-2xl mt-1"></i>
                <span className="font-bold">{destination.pensionType}</span>
              </span>
            </div>
            <form onSubmit={handleClick}>
              <button className="mt-16 border-2  font-extrabold bg-navbar_color text-white px-8 py-4 rounded-lg hover:bg-white hover:text-navbar_color hover:border-navbar_color hover:border-2">
                BOOK NOW
              </button>
            </form>
          </div>

          {submitted && (
            <div className="bg-white flex flex-col justify-center  items-center absolute  mx-auto border rounded-lg  top-1/3 left-1/3 w-1/3 p-8">
              <img className="w-20 mb-4 " src={greenTick} />
              <h1 className="font-helvetiva font-bold  text-gray-900">
                Thank you!
              </h1>
              <h2 className=" text-gray-900">
                We received your booking, we will contact you as soon as
                possible
              </h2>
            </div>
          )}
        </>
      ) : (
        <h2 className="mb-4 mt-20 text-xl font-bold">Loading</h2>
      )}
    </div>
  );
}

export default DestinationDetail;
