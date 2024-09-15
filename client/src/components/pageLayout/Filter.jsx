import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers.js";
import { PRODUCT_CATEGORIES } from "../../constants/constant.js";
import StarRatings from "react-star-ratings";

export default function Filter() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMin(searchParams.get("max"));
  }, []);

  //price filter
  const priceFilter = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  //Category  & ratings filter
  const categoryFilter = (checkbox) => {
                                          const checkboxes = document.getElementsByName(checkbox.name);

                                          checkboxes.forEach((item) => {
                                            if (item !== checkbox) item.checked = false;
                                          });

                                          if (checkbox.checked === false) {
                                            //delete filter  from query
                                            if (searchParams.has(checkbox.name)) {
                                              searchParams.delete(checkbox.name);
                                              const path = window.location.pathname + "?" + searchParams.toString();
                                              navigate(path);
                                            }
                                          } else {
                                            //set new filter value
                                            if (searchParams.has(checkbox.name)) {
                                              searchParams.set(checkbox.name, checkbox.value);
                                            } else {
                                              searchParams.append(checkbox.name, checkbox.value);
                                            }
                                            const path = window.location.pathname + "?" + searchParams.toString();
                                            navigate(path);
                                          }
                                        };

  const defaultCheckHandler = (checkboxType,
                               checkboxValue) => {
                                                    const value = searchParams.get(checkboxType);
                                                    if (checkboxValue == value) return true;
                                                    return false;
                                                  };
  return (
    <div className="filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading">Price</h5>
      <form id="filter_form" onSubmit={priceFilter} method="get">
        <div className="input-row">
          <input
            type="text"
            className="form-control"
            placeholder="Min ($)"
            name="min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Max ($)"
            name="max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          GO
        </button>
      </form>
      <hr />
      <h5>Category</h5>

      {PRODUCT_CATEGORIES?.map((category, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id={`check-${index}`}
            value={category}
            defaultChecked={defaultCheckHandler("category", category)}
            onClick={(e) => categoryFilter(e.target)}
          />
          <label className="form-check-label" htmlFor="check4">
            {" "}
            {category}{" "}
          </label>
        </div>
      ))}
      <hr />
      <h5>Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check7"
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating?.toString())}
            onClick={(e) => categoryFilter(e.target)}
          />
          <label className="form-check-label" htmlFor="check7">
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              starDimension="1.25rem"
              starSpacing="0.25rem"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
