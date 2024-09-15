import React from "react";
import MetaData from "../pageLayout/MetaData";
import { Link } from "react-router-dom";

export default function CheckOutSteps({ Shipping, confirmOrder, payment }) {
  return (
    <>
      <MetaData title={"Check Out"} />
      <div className="checkout-progress">
        {Shipping ? (
          <Link to="/shipping">
            <div className="triangle2-active"></div>
            <div className="step active-step">Shipping</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Shipping</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}
        {/* <!-- Shipping (Active) --> */}

        {/* <!-- Shipping (Inactive) --> */}

        {/* <!-- Confirm Order (Active) --> */}

        {confirmOrder ? (
          <Link to="/confirm_order">
            <div className="triangle2-active"></div>
            <div className="step active-step">Confirm Order</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Confirm Order</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {/* <!-- Confirm Order (Inactive) --> */}

        {payment ? (
          <Link to="/payment_method">
            <div className="triangle2-active"></div>
            <div className="step active-step">Payment</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Payment</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {/* <!-- Payment (Inactive) --> */}
      </div>
    </>
  );
}
