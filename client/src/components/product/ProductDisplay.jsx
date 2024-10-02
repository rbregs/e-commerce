import React from 'react'
import StarRatings from 'react-star-ratings'
import { useGetProductsQuery } from '../../redux/api/productsApi';
import { Link, useParams } from 'react-router-dom';


export default function ProductDisplay({product, columSize}) {

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columSize} my-3 mx-auto`}>
    <div className="card rounded">
      <img
        className="card-img-top mx-auto"
        src={product?.images[0]?.url}
        alt=""
      />
      <div
        className="card-body ps-3 d-flex justify-content-center flex-column"
      >
        <h5 className="adjustTitle card-title">
          <Link to={`/product/${product._id}`}>{product?.name}</Link>
        </h5>
        <div className="ratings mt-2 d-flex">
        <StarRatings
                rating={product?.ratings}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="1.25rem"
                starSpacing="0.25rem"
              />
          <span id="no_of_reviews" className="pt-2 ps-2">( {product?.numOfReviews } )</span>
        </div>
        <p className="card-text mt-2">{product?.price}</p>
        <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">
          View Details
        </Link>
      </div>
    </div>
  </div>
  )
}
