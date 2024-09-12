import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

export default function ProductDetails() {
  const params = useParams();

  const [quantity,setQuantity] = useState(1)
  const [activeImg, setActiveImg] = useState("");

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;

 

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

  if (isLoading) return <Loader />;

  const handleAddItem = () => {
    const count = document.querySelector(".count")
    if (count.valueAsNumber >= product?.stock) return
    const qty = count.valueAsNumber + 1
    setQuantity(qty)
  };

  // const handleAddItem = () => {
  //   const count = document.querySelector(".count");
  //   if (count.valueAsNumber >= product?.stock) return;
  //   const qty = count.valueAsNumber + 1;
  //   setQuantity(qty);
  // };
  
  
  // const handleSubtractItem = () => {
  //   setQuantity((prevQuantity) => {
  //     const newQuantity = prevQuantity - 1;
  //     return newQuantity < 1 ? 1 : newQuantity; 
  //   });
  // };

  const handleSubtractItem = () => {
    const count = document.querySelector(".count")
    if (count.valueAsNumber <= 1) return
    const qty = count.valueAsNumber - 1
    setQuantity(qty)
  };

  const setItemToCart = () => {
    const cartItem = {
      product:product?._id,
      name:product?.name,
      price:product?.price,
      image:product?.image[0]?.url,
      stock:product?.stock,
      quantity
    }
  }
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
              <span className="subtract" onClick={handleSubtractItem}> - </span>
              <input type="number"
               id="specific-input" 
               className="count"
               value={quantity}
               disabled />
              <span className="addition" onClick={handleAddItem}>+</span>
              <button className="btnCart">Add to Cart</button>
            </div>
            <hr />
            <div className="stockStatus">
              <p>Status: </p>
              <span className={product?.stock > 0 ? "stock" : "outOfStock"}>
                {product?.stock > 0 ? `In Stock ( ${product?.stock} )` : "Out of Stock"}{" "}
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
