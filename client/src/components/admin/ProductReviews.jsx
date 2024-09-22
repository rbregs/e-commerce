import React, { useEffect, useState } from "react";
import AdminLayout from "../pageLayout/AdminLayout";
import MetaData from "../pageLayout/MetaData";
import { MDBDataTable } from "mdbreact";
import { useLazyGetProductreviewsQuery } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import { Loader } from "../pageLayout/Loader";

export default function ProductReviews() {
  const [productId, setProductId] = useState("");
  const [getProductReviews, { data, isLoading, error }] =
    useLazyGetProductreviewsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;


  const setReviews = () => {
    if (!data || !data.reviews || data.reviews.length === 0) {
      return {
        columns: [
          {
            label: "Review ID",
            field: "id",
            sort: "asc",
          },
          {
            label: "Rating",
            field: "rating",
            sort: "asc",
          },
          {
            label: "Comment",
            field: "comment",
            sort: "asc",
          },
          {
            label: "User",
            field: "user",
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
    }

    const reviews = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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

    data.reviews.forEach((review) => {
      reviews.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,  
        user: review.user?.name || "Unknown User",
        actions: (
          <>
            <button
              className="btn btn-outline-success ms-2"
              //   onClick={() => deleteUserHandle(review?._id)}
              //   disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>{" "}
            </button>
          </>
        ),
      });
    });

    return reviews;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
    console.log( data);
  };


  return (
    <>
      <MetaData title={"Reviews"} />
      <AdminLayout>
        <div className="row justify-content-center my-5">
          <div className="col-6">
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="productId_field" className="form-label">
                  Enter Product ID
                </label>
                <input
                  type="text"
                  id="productId_field"
                  className="form-control"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <button
                id="search_button"
                type="submit"
                className="btn btn-primary w-100 py-2"
              >
                SEARCH
              </button>
            </form>
          </div>
        </div>

        <MDBDataTable
          data={setReviews()}
          className="px-3"
          bordered
          striped
          hover
        />
      </AdminLayout>
    </>
  );
}
