import React, { useState, useEffect } from "react";
import AdminLayout from "../pageLayout/AdminLayout";
import { Loader } from "../pageLayout/Loader";
import toast from "react-hot-toast";
import { useCreateProductMutation } from "../../redux/api/productsApi";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../constants/constant";
import MetaData from "../pageLayout/MetaData";

export default function NewProduct() {
  const navigate = useNavigate();
  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product created");
      navigate("/admin/products");
    }
  }, [error, isSuccess, navigate]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
  });

  const { name, description, price, category, stock, seller } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Create New Product"} />
      <AdminLayout>
        <div className="row wrapper ">
          <div className=" col-10 col-lg-10 mt-5 mt-lg-0">
            <form className=" newProduct shadow rounded  p-5 border">
              <h2 className="mb-4">New Product</h2>
              <div className="mb-3">
                <label htmlFor="name_field" className="form-label">
                  {" "}
                  Name{" "}
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
                    {" "}
                    Price{" "}
                  </label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    name="price"
                  />
                </div>

                <div className="mb-3 col">
                  <label htmlFor="stock_field" className="form-label">
                    {" "}
                    Stock{" "}
                  </label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    name="stock"
                    value={price}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="category_field" className="form-label">
                    {" "}
                    Category{" "}
                  </label>
                  <select
                    className="form-select"
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
                    {" "}
                    Seller Name{" "}
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
              <button
                type="submit"
                className="createNewProduct btn w-100 py-2
"
                disabled={isLoading}
              >
                {isLoading ? "Creating new product.." : "Create"}
              </button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
