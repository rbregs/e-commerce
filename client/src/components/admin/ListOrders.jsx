import React, { useEffect } from "react";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../pageLayout/MetaData";
import AdminLayout from "../pageLayout/AdminLayout";
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from "../../redux/api/orderApi";

export const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();
  const [deleteOrder, { error: deleteError, isLoading: isDeleteLoading, isSuccess }] =useDeleteOrderMutation()
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if(deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if(isSuccess) {
      toast.success("Order Deleted");
    }
    
  }, [error,deleteError,isSuccess]);

  if (isLoading) return <Loader />;

  const deleteOrderHandle = (id) => {
    deleteOrder(id);
    console.log(id)
  };

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },

        {
          label: "Payment Status",
          field: "paymentStatus",
          sort: "asc",
        },

        {
          label: "Oreder Status",
          field: "orderStatus",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };


    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus : order?.orderStatus,
       
        actions: (
          <>
            <Link
              to={`/admin/orders/${order?._id}`}
              className="btn btn-outline-primary"
            >
              {" "}
              <i className="fa fa-pencil"></i>{" "}
            </Link>
            <button
              className="btn btn-outline-success ms-2"
              onClick={() => deleteOrderHandle(order?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>{" "}
            </button>
          </>
        ),
      
      });
    });


    return orders;
  };



 

  return (
    <>
      <MetaData title={"All Orders"} />
      <AdminLayout>
        <div>
          <h1 className="my-3">{data?.orders?.length} Orders</h1>
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        </div>
      </AdminLayout>
    </>
  );
};
