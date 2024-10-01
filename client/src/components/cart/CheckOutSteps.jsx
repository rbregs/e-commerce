import React from "react";
import MetaData from "../pageLayout/MetaData";
import { Link } from "react-router-dom";

export default function CheckOutSteps({ Shipping, confirmOrder, payment }) {
  return (
    <>
      <MetaData title={"Check Out"} />
      <div className="checkout-progress d-flex justify-content-center mt-2 row">
        {Shipping ? (
          <Link to="/shipping" className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2">

            <div className="triangle2-active"></div>
            <div className="step active-step">Shipping</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Shipping</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}
        {/* <!-- Shipping (Active) --> */}

        {/* <!-- Shipping (Inactive) --> */}

        {/* <!-- Confirm Order (Active) --> */}

        {confirmOrder ? (
          <Link to="/confirm_order" className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2">
            <div className="triangle2-active"></div>
            <div className="step active-step">Confirm Order</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2" disabled>
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Confirm Order</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {/* <!-- Confirm Order (Inactive) --> */}

        {payment ? (
          <Link to="/payment_method" className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2">
            <div className="triangle2-active"></div>
            <div className="step active-step">Payment</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link to="#!" className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2" disabled>
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
