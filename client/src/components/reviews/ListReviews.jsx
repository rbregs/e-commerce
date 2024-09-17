import React from "react";
import StarRatings from "react-star-ratings";

export default function ListReviews({ reviews }) {
  return (
    <div className="list-reviews-container w-75">
      <h5>Other's Reviews:</h5>
      <hr />
      {reviews.map((review) => (
        <div key={review?._id} className="list-review-card my-3">
          <div className="list-review-row">
            <div className="list-review-avatar">
              <img
                src={
                  review?.user?.avatar
                    ? review?.user?.avatar?.url
                    : "../public/images/avatar.png"
                }
                alt="User Avatar"
                width="50"
                height="50"
                className="list-review-avatar-img"
              />
            </div>
            <div className="list-review-content">
            <StarRatings
                rating={review?.rating}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="1.2rem"
                starSpacing="0.25rem"
              />
              <p className="list-review-username">by {review?.user?.name}</p>
              <p className="list-review-comment">{review?.comment}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
