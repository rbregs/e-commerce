import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function ProductofTheMonth() {
  const params = useParams();
  const [randomProduct, setRandomProduct] = useState(null);
  const { data, isLoading, error } = useGetProductsQuery({});
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    if (!isLoading && data && data.products && data.products.length > 0) {
      const selectedProduct = pickRandomProduct(data.products);
      console.log("Random Product:", selectedProduct);
      setRandomProduct(selectedProduct);
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    setActiveImg(
      randomProduct?.images[0]?.url
        ? randomProduct.images[0].url
        : "/images/default_product.png"
    );
  }, [randomProduct]);

  function pickRandomProduct(products) {
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  }

  return (
    <div className="container my-5">
      <div className="text-center">
        <h1>WONDER OF THE MONTH</h1>
        <div className="row my-5">
          <div className="col-lg-6 col-md-12 border mb-4">
            <img
              src={activeImg}
              alt="Product"
              className="POTM-images mt-5 img-fluid"
            />
            <div className="d-flex flex-row justify-content-center flex-wrap mt-5">
              {randomProduct?.images?.map((img, index) => (
                <div className="m-2" key={index}>
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
          <div className="col-lg-6 col-md-12 border">
            <div className="d-flex flex-column text-start">
              <p className="WOTM-title">{randomProduct?.name}</p>
              <p className="WOTM-description mt-5">{randomProduct?.description}</p>
              <hr />
              <div className="d-flex align-items-center">
                <p className="mb-0 me-3 mt-1">
                  <b>${randomProduct?.price}</b>
                </p>
                <div className="star-ratings d-flex align-items-center">
                  <StarRatings
                    rating={randomProduct?.ratings}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    starDimension="1.25rem"
                    starSpacing="0.25rem"
                  />
                  <span className="ms-3 mb-0 mt-1">({randomProduct?.ratings})</span>
                </div>
              </div>
              <hr />
              <div>
                <button className="addtoCart w-100 p-2">ADD TO CART</button>
                <button className="viewDetails w-100 p-2 mt-3">VIEW DETAILS</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
