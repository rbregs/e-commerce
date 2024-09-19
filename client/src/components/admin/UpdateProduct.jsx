import React, { useState, useEffect } from "react";
import AdminLayout from "../pageLayout/AdminLayout";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../constants/constant";
import MetaData from "../pageLayout/MetaData";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams()
  const [UpdateProduct, { isLoading, error, isSuccess }] = useUpdateProductMutation();

  const {data} = useGetProductDetailsQuery(params.id)

  
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
  });

  useEffect(() => {

    if (data?.product) {
        setProduct({
            name:data?.product?.name,
            description:data?.product?.description,
            price:data?.product?.price,
            category:data?.product?.category,
            stock:data?.product?.stock,
            seller:data?.product?.seller,
        })
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product updated");
      navigate("/admin/products");
    }
  }, [error, isSuccess, data]);


  const { name, description, price, category, stock, seller } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    UpdateProduct({ id:params?.id, body:product });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Update Product"} />
      <AdminLayout>
        <div className="CNP-wrapper">
          <div className="CNP-container">
            <form className="shadow rounded bg-body" onSubmit={submitHandler}>
              <h2 className="mb-4">Update Product</h2>
              <div className="mb-3">
                <label htmlFor="name_field" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description_field" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  name="description"
                  value={description}
                  onChange={onChange}
                ></textarea>
              </div>

              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="price_field" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    name="price"
                    value={price}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3 col">
                  <label htmlFor="stock_field" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    name="stock"
                    value={stock}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="category_field" className="form-label">
                    Category
                  </label>
                  <select
                    className="CNP-form-select"
                    id="category_field"
                    name="category"
                    value={category}
                    onChange={onChange}
                  >
                    {PRODUCT_CATEGORIES?.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col">
                  <label htmlFor="seller_field" className="form-label">
                    Seller Name
                  </label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    name="seller"
                    value={seller}
                    onChange={onChange}
                  />
                </div>
              </div>
              <button type="submit" className="CNP-btn" disabled={isLoading}>
                {isLoading ? "Updating.." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
