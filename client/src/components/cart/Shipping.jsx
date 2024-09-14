import React, { useState } from 'react'
import MetaData from '../pageLayout/MetaData'
import { useSelector } from 'react-redux';

export default function Shipping() {

    const { user } = useSelector((state)=>state.auth)
    const [address,setAddress] = useState('')
    const [city,setcity] = useState('')
    const [zipcode,setZipcode] = useState('')
    const [phoneNo,setphoneNo] = useState('')
    const [country,setcountry] = useState('')
  return (
    <>
      <MetaData title={"Shipping"} />
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            action="your_submit_url_here"
            method="post"
          >
            <h2 className="mb-4">Shipping Info</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">Phone No</label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setphoneNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="postal_code_field" className="form-label">Zip Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                name="postalCode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label">Country</label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                onChange={(e) => setcountry(e.target.value)}
                required
              >
                <option value="Country1">Country1</option>
                <option value="Country2">Country2</option>
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
