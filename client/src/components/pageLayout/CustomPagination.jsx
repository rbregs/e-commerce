import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CustomPagination({
  resPerPage,
  filteredProductsCount,
}) {
  const [currentPage, setCurrentPage] = useState();

  let [searchParams] = useSearchParams();
  const navigate =useNavigate()



  const page = Number(searchParams.get("page")) || 1;

  const setCurrentPageNo = (pageNumber) => {
   setCurrentPage(pageNumber)

   if (searchParams.has("page")){
        searchParams.set("page",pageNumber)
   }else{
    searchParams.append("page",pageNumber)
   }

   const path = window.location.pathname + "?" + searchParams.toString()
    navigate(path)
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div className="pagination d-flex justify-content-center mt-5">
      {filteredProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
}
