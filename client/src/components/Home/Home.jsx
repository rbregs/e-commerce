import React, { useEffect } from "react";
import MetaData from "../pageLayout/MetaData";
import { useGetProductsQuery } from "../../redux/api/productsApi.js";
import ProductItem from "../product/ProductItem.jsx";
import { Loader } from "../pageLayout/Loader.jsx";
import toast from "react-hot-toast";
import CustomPagination from "../pageLayout/CustomPagination.jsx";
import { useSearchParams } from "react-router-dom";
import Filter from "../pageLayout/Filter.jsx";
import MyCarousel from "../pageLayout/MyCarousel.jsx";
import ProductofTheMonth from "../product/ProductOfTheMonth.jsx";
import AnotherSection from "../pageLayout/Section.jsx";

export default function Home({ product }) {
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min"); // price search
  const max = searchParams.get("max");
  const category = searchParams.get("category"); // category search
  const ratings = searchParams.get("ratings"); // category search

  const params = { page, keyword };

  if (min !== null) params.min = min; // price search
  if (max !== null) params.max = max;
  if (category !== null) params.category = category; // category
  if (ratings !== null) params.ratings = ratings; // ratings

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  const hasSearchResults = data?.products?.length > 0;

  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      {!keyword || !hasSearchResults ? <MyCarousel /> : null}

      <div className="row">
        {keyword && (
          <div className="col-md-3">
            <Filter />
          </div>
        )}

        <div className={keyword ? "col-9" : "col-12"}>
          <h1 className="my-4 text-center">
            {keyword
              ? `${data?.products?.length} Product(s) found with keyword "${keyword}"`
              : "PRODUCTS"}
          </h1>

          <div className="row ">
            {data?.products?.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                key={product._id}
              >
                <ProductItem product={product} />
              </div>
            ))}
          </div>

          {/* Pagination component */}
          {keyword && hasSearchResults && (
            <CustomPagination
              resPerPage={data?.resPerPage}
              filteredProductsCount={data?.filteredProductsCount}
            />
          )}

          {!keyword || !hasSearchResults ? (
            <ProductofTheMonth product={product} />
          ) : null}

          <hr />

          {!keyword || !hasSearchResults ? <AnotherSection /> : null}
        </div>
      </div>
    </>
  );
}
