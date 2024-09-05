import React from "react";
import MetaData from "../pageLayout/MetaData";

export default function Home() {
  return (
    <>
      <MetaData title={'Buy Best Product Online'} />
      <div className="main-container">
        <h3>Latest Product</h3>
        <div className="card-container">
          <img src="../images/Product/sample.png" alt="Product" />
          <h5>Product Name</h5>
          <div className="ratings">
            <div className="star-ratings">
              <i className="fa fa-star star-active"></i>
              <i className="fa fa-star star-active"></i>
              <i className="fa fa-star star-active"></i>
              <i className="fa fa-star star-active"></i>
              <i className="fa fa-star star-active"></i>
            </div>
            <span id="no_of_reviews" className="reviews">
              (0)
            </span>
          </div>
          <div className="price">$100</div>
          <a href="#" className="btn_Details">View Details</a>
        </div>
      </div>
    </>
  );
}
