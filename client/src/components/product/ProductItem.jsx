import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function ProductItem({ product }) {
  return (
    <div className=" p-1 mx-3">
      <div className=" row justify-content-center border">
        <div className=" card w-100">
          <img
            src={product?.images[0]?.url}
            alt="Product"
            className=" card-img-top" 
          />
          <div className="card-body">
            <h5 className=" card-title text-truncate">
              <Link to={`/product/${product?._id}`}>{product?.name}</Link>
            </h5>
            <p className=" card-text py-1">
              <span className="price">{`$${product?.price}`}</span>
            </p>
            <div className="d-flex align-items-center mx-auto">
              <div className="star-ratings">
                <StarRatings
                  rating={product?.ratings}
                  starRatedColor="orange"
                  numberOfStars={5}
                  name="rating"
                  starDimension="1.25rem"
                  starSpacing="0.25rem"
                />
              </div>
              <span id="no_of_reviews" className="reviews ms-2 mt-1">
                ({product?.numOfReviews})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
