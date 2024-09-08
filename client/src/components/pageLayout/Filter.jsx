import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPriceQueryParams } from '../../helpers/helpers.js'

export default function Filter() {

    const [min,setMin] =useState(0)
    const [max,setMax] =useState(0)

    const navigate  = useNavigate()
    let[searchParams] = useSearchParams()

    const handleButtonClick = (e) => {


        e.preventDefault()
        searchParams = getPriceQueryParams(searchParams,"min", min)
        searchParams = getPriceQueryParams(searchParams,"max", max)
    
        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path)
    }
  return (
    <div className="filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading">Price</h5>
      <form id="filter_form" onSubmit={handleButtonClick} method="get">
        <div className="input-row">
          <input
            type="text"
            className="form-control"
            placeholder="Min ($)"
            name="min"
            value={min}
            onChange={ (e) => setMin (e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Max ($)"
            name="max"
            value={max}
            onChange={ (e) => setMax (e.target.value)}
          />
        </div>
        <button type="submit" className="btn">GO</button>
      </form>
      <hr />
      <h5>Category</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="category"
          id="check4"
          value="Category 1"
        />
        <label className="form-check-label" htmlFor="check4"> Category 1 </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="category"
          id="check5"
          value="Category 2"
        />
        <label className="form-check-label" htmlFor="check5"> Category 2 </label>
      </div>
      <hr />
      <h5>Ratings</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        />
        <label className="form-check-label" htmlFor="check7">
          <span className="star-rating">★ ★ ★ ★ ★</span>
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check8"
          value="4"
        />
        <label className="form-check-label" htmlFor="check8">
          <span className="star-rating">★ ★ ★ ★ ☆</span>
        </label>
      </div>
    </div>
  )
}
