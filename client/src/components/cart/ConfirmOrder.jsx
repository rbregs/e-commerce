import React from "react";
import MetaData from "../pageLayout/MetaData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { calculateOrderCost } from "../../helpers/helpers";
import CheckOutSteps from "./CheckOutSteps";

export default function ConfirmOrder() {

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth);

  const { shippingInfo, 
          cartItems } = useSelector((state) => state.cart);

  const {itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,} =  calculateOrderCost(cartItems)
                        const proceedToPaymentHandler = () => {
  
                        navigate('/payment_method')
                       } 



  return (
    <>
      <MetaData title={"Confirm Order"} />
      <CheckOutSteps shipping confirmOrder />
      <div className="row d-flex justify-content-between ms-5 me-5">
        <div className="col-12 col-lg-8 mt-5 order-confirm ">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo?.address},{shippingInfo?.city},
            {shippingInfo?.zipcode},{shippingInfo.country}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          <hr />
          {cartItems.map((item) => (
            <>
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item?.image}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item?.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item?.quantity} x {item?.price} ={" "}
                      <b>{(item?.quantity * item?.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping: <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn w-100 updateProfile-btn"
              onClick={proceedToPaymentHandler}
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
