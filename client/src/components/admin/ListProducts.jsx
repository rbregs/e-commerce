import React, { useEffect } from "react";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../pageLayout/MetaData";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/productsApi";
import AdminLayout from "../pageLayout/AdminLayout";

export const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();
  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product Deleted");
    }
  }, [error, deleteError, isSuccess]);

  if (isLoading) return <Loader />;

  const deleteProductHandle = (id) => {
    deleteProduct(id);
  };

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },

        {
          label: "Name",
          field: "name",
          sort: "asc",
        },

        {
          label: "Stock",
          field: "stock",
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

    data?.product?.forEach((item) => {
      products.rows.push({
        id: item?._id,
        name: <span className="name-column">{item?.name}</span>,
        stock: item?.stock,
        actions: (
          <>
            <Link
              to={`/admin/products/${item?._id}`}
              className="btn btn-outline-primary"
            >
              {" "}
              <i className="fa fa-pencil"></i>{" "}
            </Link>
            <Link
              to={`/admin/products/${item?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              {" "}
              <i className="fa fa-image"></i>{" "}
            </Link>
            <button
              className="btn btn-outline-success ms-2"
              onClick={() => deleteProductHandle(item?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>{" "}
            </button>
          </>
        ),
      });
    });

    return products;
  };

  return (
    <>
      <MetaData title={"All Products"} />
      <AdminLayout>
        <div>
          <h1 className="my-3">{data?.product?.length} Products</h1>
          <MDBDataTable
            data={setProducts()}
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
