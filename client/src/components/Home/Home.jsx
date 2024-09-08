import React, { useEffect } from "react";
import MetaData from "../pageLayout/MetaData";
import { useGetProductsQuery } from "../../redux/api/productsApi.js";
import ProductItem from "../product/ProductItem.jsx";
import { Loader } from "../pageLayout/Loader.jsx";
import toast from "react-hot-toast";
import CustomPagination from "../pageLayout/CustomPagination.jsx";
import { useSearchParams } from "react-router-dom";
import Filter from "../pageLayout/Filter.jsx";

export default function Home() {
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  //price search
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  const params = { page, keyword };

  //price search
  min !== null && (params.min = min);
  max !== null && (params.max = max);

  const { data, isLoading, error, isError } = useGetProductsQuery(params)

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      <div className="container">
        <div className="home-layout">
          {keyword && (
            <div className="custom-col">
              {/* <div className="">  FILTERS */}
              <Filter />
              {/* </div> */}
            </div>
          )}
          <div className="row">
            <h1>
              {keyword
                ? `${data?.products?.length} Product found with keyword ${keyword}`
                : "Latest Products"}
            </h1>
            <div className={keyword ? "col2" : "col"}>
              {data?.products?.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
            <CustomPagination
              resPerPage={data?.resPerPage}
              filteredProductsCount={data?.filteredProductsCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
