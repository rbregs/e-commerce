import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

export default function ProductDetails() {
  const params = useParams();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;

  const [activeImg, setActiveImg] = useState("");

  // ----set default image
  useEffect(() => {
    setActiveImg(
      product?.images[0]?.url
        ? product.images[0].url
        : "/images/default_product.png"
    );
  }, [product]);

  // --------check error
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  //load loader
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="productDetails-container">
        <div className="product-container">
          <div className="productImages">
            <div className="mainProduct">
              <img src={activeImg} alt={product?.name} />
            </div>

            <div className="preview-container">
              {product?.images?.map((img) => (
                <div className="col" key={img.url}>
                  <a role="button" onClick={() => setActiveImg(img.url)}>
                    <img
                      className={`custom-image ${
                        img.url === activeImg ? "blueBorder" : ""
                      }`}
                      height="100"
                      width="100"
                      src={img?.url}
                      alt={img?.url}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="productDetails">
            <h4>{product?.name}</h4>
            <p>{product?._id}</p>
            <hr />
            <div className="reviews">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="1.2rem"
                starSpacing="0.25rem"
              />
              <div className="numberOfReviews">
                {" "}
                <span>({product?.numOfReviews})</span>{" "}
              </div>
            </div>
            <hr />
            <h4>$ {product?.price}</h4>
            <div className="quatitySection">
              <span className="subtract">-</span>
              <input type="number" id="specific-input" value="1" disabled />
              <span className="addition">+</span>
              <button className="btnCart">Add to Cart</button>
            </div>
            <hr />
            <div className="stockStatus">
              <p>Status: </p>
              <span className={product?.stock > 0 ? "stock" : "outOfStock"}>
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}{" "}
              </span>
            </div>
            <hr />
            <div className="descriptionSection">
              <h4>Description</h4>
              <p className="productInfo">{product?.description}</p>
            </div>
            <hr />
            <div>
              <p>Sold by: {product.seller} </p>
            </div>
            <div className="reviewSection">
              <div className="viewReview">
                <p>Login to Post your review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
