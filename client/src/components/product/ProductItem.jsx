import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function ProductItem({ product }) {
  return (
    <>
      <section id="products">
        <div className="row">
          <img src={product?.images[0]?.url} alt="Product" />
          {/* <img src="../images/Product/sample.png" alt="Product" /> */}

          <div className="card-body">
            <h6>
              <Link to={`/product/${product?._id}`}>{product?.name}</Link>
            </h6>

            <div className="ratings">
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
              <span id="no_of_reviews" className="reviews">
                ({product?.numOfReviews})
              </span>
            </div>
            <p className="price">{`$${product?.price}`}</p>
            <div className="btnDetails"><Link to={`/product/${product?._id}`} className="view">
              View Details
            </Link></div>
            
          </div>
        </div>
      </section>
    </>
  );
}
