import React, { useEffect } from "react";
import MetaData from "../pageLayout/MetaData";
import { useGetProductsQuery } from "../../redux/api/productsApi.js";
import ProductItem from "../product/ProductItem.jsx";
import { Loader } from "../pageLayout/Loader.jsx";
import toast from "react-hot-toast";
import CustomPagination from "../pageLayout/CustomPagination.jsx";
import { Link, useSearchParams } from "react-router-dom";
import Filter from "../pageLayout/Filter.jsx";
import StarRatings from "react-star-ratings";
import ProductDisplay from "./ProductDisplay.jsx";

export default function AllProducts() {
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min"); //price search
  const max = searchParams.get("max");
  const category = searchParams.get("category"); //category search
  const ratings = searchParams.get("ratings"); //category search

  const params = { page, keyword };

  min !== null && (params.min = min); //price search
  max !== null && (params.max = max);
  category !== null && (params.category = category); // category
  ratings !== null && (params.ratings = ratings); // ratings

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) return <Loader />;

const columSize = keyword ? 4 : 3

  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5"><Filter /></div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword ? `${data?.products?.length} Products Found with keyword: ${keyword}` : "" }
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductDisplay product={product} columSize= {columSize} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <CustomPagination
        resPerPage={data?.resPerPage}
        filteredProductsCount={data?.filteredProductsCount}
      />
    </>
  );
}
