import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../redux/features/cartSlice";
import MetaData from "../pageLayout/MetaData";
import NewReview from "../reviews/NewReview";
import ListReviews from "../reviews/ListReviews";

export default function ProductDetails() {
  const params = useParams();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");

  const dispatch = useDispatch();

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

  const handleAddItem = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product?.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const handleSubtractItem = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItems(cartItem));
    toast.success("Item added to cart");
  };

  console.log(product?.reviews);
  return (
    <>
      <MetaData title={"Product Info"} />
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <div className="p-3">
            <img src={activeImg} alt={product?.name} />
          </div>
          <div className="row justify-content-start mt-5">
            {product?.images?.map((img) => (
              <div className="col-2 ms-4 mt-2" key={img.url}>
                <a role="button">
                  <img
                    className={`d-block  rounded p-3 cursor-pointer ${
                      img.url === activeImg ? "blueBorder" : ""
                    }`}
                    height="100"
                    width="100"
                    src={img?.url}
                    alt={img?.url}
                    onClick={() => setActiveImg(img.url)} // Optional: Add click handler to change the image
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product?.name}</h3> {/* Fixed missing closing tag */}
          <p id="product_id">{product?._id}</p>
          <hr />
          <div className="d-flex">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              starDimension="1.2rem"
              starSpacing="0.25rem"
            />
            <span id="no-of-reviews" className="pt-1 ps-2">
              ({product?.numOfReviews})
            </span>
          </div>
          <hr />
          <p id="product_price">{product?.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={handleSubtractItem}>
              -
            </span>
            <input
              type="number"
              className="inputPDetails form-control count d-inline"
              value={quantity}
              disabled
            />
            <span className="btn btn-primary plus" onClick={handleAddItem}>
              +
            </span>
          </div>
          <button
            className="btn btn-primary d-inline ms-4"
            disabled={product.stock === 0}
            onClick={setItemToCart}
          >
            Add to Cart
          </button>
          <hr />
          <p>
            Status:
            <span className={product?.stock > 0 ? "stock" : "outOfStock"}>
              {product?.stock > 0
                ? `In Stock ( ${product?.stock} )`
                : "Out of Stock"}
            </span>
          </p>
          <hr />
          <h4 className="mt-2">Description:</h4>
          <p>{product?.description}</p>
          <hr />
          <p id="product_seller" className="mb-3">
            Sold by: {product.seller}
          </p>
          {isAuthenticated ? (
            <NewReview productId={product?._id} />
          ) : (
            <div className="alert alert-danger my-5" role="alert">
              <p>Login to post your review</p>
            </div>
          )}
        </div>
      </div>

      {product?.reviews?.length > 0 && (
        <ListReviews reviews={product?.reviews} />
      )}
    </>
  );
}
