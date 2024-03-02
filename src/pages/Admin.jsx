import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DeleteConfirmationPopup from "../components/DeleteConfirmation";

function Admin() {
  const [review, setReview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

  //useEffect to get the REVIEWS
  useEffect(() => {
    getReviews();
  }, []);

  const deleteReview = (reviewID) => {
    axios
      .delete(`http://localhost:5005/reviews/${reviewID}`)
      .then(() => {
        getReviews();
        setShowPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getReviews() {
    axios
      .get("http://localhost:5005/reviews")
      .then((result) => {
        setReview(result.data);
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
              <div className="flex mb-4 justify-between">
                <div className="flex flex-start">
                  <img src={oneReview.flag} alt="" className="w-8 mr-2" />
                  <h2 className="inline text-lg font-extrabold text-navbar_color">
                    {oneReview.name}
                  </h2>
                </div>
                <div className="mt-1 text-xl flex items-center gap-2">
                  <Link to={`/admin/edit/${oneReview.id}`}>
                    <i className="fi fi-rs-pencil text-yellow-500"></i>
                  </Link>

                  <button
                    className="text-red-500"
                    onClick={() => {
                      setReviewIdToDelete(oneReview.id);
                      setShowPopup(true);
                    }}
                  >
                    <i className="fi fi-rs-trash"></i>
                  </button>
                </div>
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
      {showPopup && (
        <DeleteConfirmationPopup
          onCancel={() => setShowPopup(false)}
          onConfirm={() => deleteReview(reviewIdToDelete)}
        />
      )}
    </div>
  );
}

export default Admin;
