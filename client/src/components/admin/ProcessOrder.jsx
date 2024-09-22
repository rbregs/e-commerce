import React, { useEffect, useState } from "react";
import MetaData from "../pageLayout/MetaData";
import AdminLayout from "../pageLayout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";

export default function ProcessOrder() {
  const params = useParams();
  const { data } = useOrderDetailsQuery(params?.id);
  const [status,setStatus] =useState("")

  const order = data?.order || {};
  const[updateOrder, { error, isSuccess }] = useUpdateOrderMutation();



  const {
    shippingInfo,
    orderItems = [],
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;



  const isPaid = paymentInfo?.status === "paid";

  useEffect(() => {

    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Updated");
    }
  }, [error, isSuccess, orderStatus]);

  useEffect(()=> {
    if (orderStatus) {
      setStatus(orderStatus)
    }
  },[orderStatus])



  const updateOrderHandler = (id) => {
    const data = { orderStatus: status };
    updateOrder({ id, body: data });
    console.log(status,data)
  };

  return (
    <>
      <MetaData title="Process Order" />
      <AdminLayout>
        <div className="row d-flex justify-content-around">
          <div className="col-12 col-lg-8 order-details">
            <h3 className="mt-5 mb-4">Order Details</h3>

            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th scope="row">ID</th>
                  <td>{order?._id}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td
                    className={
                      orderStatus !== "Delivered" ? "redColor" : "greenColor"
                    }
                  >
                    {orderStatus}
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className="mt-5 mb-4">Shipping Info</h3>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{user?.name}</td>
                </tr>
                <tr>
                  <th scope="row">Phone No</th>
                  <td>{shippingInfo?.phoneNumber}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>
                    {shippingInfo?.address}, {shippingInfo?.city},{" "}
                    {shippingInfo?.zipCode}, {shippingInfo?.country}
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className="mt-5 mb-4">Payment Info</h3>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Status</th>
                  <td className={isPaid ? "greenColor" : "redColor"}>
                    {paymentInfo?.status}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Method</th>
                  <td>{order?.paymentMethod}</td>
                </tr>
                <tr>
                  <th scope="row">Stripe ID</th>
                  <td>{paymentInfo?.id || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Amount</th>
                  <td>{totalAmount}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="mt-5 my-4">Order Items:</h3>

            <hr />

            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <div className="cart-item my-1" key={item.product}>
                  <div className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>
                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.product}`}>{item?.name}</Link>
                    </div>
                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${item.price}</p>
                    </div>
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item?.quantity} Piece(s)</p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <p>No items found.</p>
            )}
          </div>

          <div className="col-12 col-lg-3 mt-5">
            <h4 className="my-4">Status</h4>

            <div className="mb-3">
              <select
                className="form-select"
                name="status"
                value={status}
                onChange={(e) =>setStatus(e.target.value)}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <button className="btn btn-primary w-100" onClick={() => updateOrderHandler(order?._id)}>Update Status</button>

            <h4 className="mt-5 mb-3">Order Invoice</h4>
            <Link
              to={`/invoice/order/${order?._id}`}
              className="btn btn-success w-100"
            >
              <i className="fa fa-print"></i> Generate Invoice
            </Link>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
