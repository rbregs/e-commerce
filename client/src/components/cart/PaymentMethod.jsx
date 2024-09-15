import React, { useEffect, useState } from "react";
import MetaData from "../pageLayout/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helpers";
import { useCreatNewOrderMutation, useStripeCheckoutSessionMutation } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod() {
  const navigate = useNavigate()
  const [method, setMethod] = useState("")
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const[stripeCheckoutSession, { data:checkoutData, error:CheckoutError, isLoading } ]  = useStripeCheckoutSessionMutation()

  useEffect(()=> {

    if (checkoutData) {
     window.location.href =(checkoutData?.url);
    }

    if(CheckoutError) {
      toast.error(CheckoutError?.data?.message)
    }

  },[checkoutData, CheckoutError])

  const [creatNewOrder, {error, isSuccess }] =
    useCreatNewOrderMutation();

    useEffect (() => {
        if(error) {
            toast.error(error?.data?.message)
        }

        if (isSuccess){
            navigate("/")
        }
    },[error, isSuccess])

  const submitHandler = (e) => {
                                  e.preventDefault();
                                  console.log("Cart Items:", cartItems);
                                  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
                                  calculateOrderCost(cartItems);
                              
                                  if (method == "COD") {
                                      const orderData = {
                                          orderItems: cartItems,
                                          shippingInfo,
                                          itemPrice :itemsPrice ,
                                          shippingAmount: shippingPrice,
                                          taxAmount: taxPrice,
                                          totalAmount: totalPrice,
                                          paymentInfo: {
                                          status: "Not Paid",
                                          },
                                          paymentMethod: "COD",
                                      
                                      };
                                      creatNewOrder(orderData);
                                  }
                                  if (method === "Card") {
                                    const orderData = {
                                      orderItems: cartItems,
                                      shippingInfo,
                                      itemPrice :itemsPrice ,
                                      shippingAmount: shippingPrice,
                                      taxAmount: taxPrice,
                                      totalAmount: totalPrice,
                                    }; 

                                    stripeCheckoutSession(orderData)
                                  }
                              };
            


  return (
    <>
      <MetaData title={"Payment Method"} />
      <CheckOutSteps Shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            action="your_submit_url_here"
            method="post"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button id="shipping_btn" type="submit" className="btn py-2 w-100" disabled={isLoading}>
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
